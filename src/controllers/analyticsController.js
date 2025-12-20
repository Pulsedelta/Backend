import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import { query } from '../database/config.js';
import Market from '../database/models/Market.js';

/**
 * @desc    Get platform-wide statistics
 * @route   GET /api/v1/analytics/platform
 * @access  Public
 */
export const getPlatformStats = asyncHandler(async (req, res) => {
  // Get total markets count
  const marketsResult = await query('SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE status = $1) as active FROM markets', ['active']);
  const { total: totalMarkets, active: activeMarkets } = marketsResult.rows[0];

  // Get total users count
  const usersResult = await query('SELECT COUNT(*) as total FROM users');
  const totalUsers = usersResult.rows[0].total;

  // Get total volume
  const volumeResult = await query('SELECT COALESCE(SUM(total_volume), 0) as total FROM markets');
  const totalVolume = volumeResult.rows[0].total;

  // Get total trades
  const tradesResult = await query('SELECT COUNT(*) as total FROM market_events WHERE event_type IN ($1, $2)', ['SharesPurchased', 'SharesSold']);
  const totalTrades = tradesResult.rows[0].total;

  // Get last 24h stats
  const last24hResult = await query(
    `SELECT 
      COALESCE(SUM(CAST(cost AS NUMERIC)), 0) as volume,
      COUNT(*) as trades
    FROM market_events 
    WHERE event_type IN ($1, $2) AND timestamp > NOW() - INTERVAL '24 hours'`,
    ['SharesPurchased', 'SharesSold']
  );
  
  const newUsersResult = await query(
    'SELECT COUNT(*) as new_users FROM users WHERE created_at > NOW() - INTERVAL \'24 hours\''
  );

  const stats = {
    totalMarkets: parseInt(totalMarkets, 10) || 0,
    activeMarkets: parseInt(activeMarkets, 10) || 0,
    totalVolume: totalVolume?.toString() || '0',
    totalUsers: parseInt(totalUsers, 10) || 0,
    totalTrades: parseInt(totalTrades, 10) || 0,
    last24h: {
      volume: last24hResult.rows[0].volume?.toString() || '0',
      trades: parseInt(last24hResult.rows[0].trades, 10) || 0,
      newUsers: parseInt(newUsersResult.rows[0].new_users, 10) || 0,
    },
  };

  sendSuccess(res, stats, 'Platform statistics retrieved successfully');
});

/**
 * @desc    Get trading volume data
 * @route   GET /api/v1/analytics/volume
 * @access  Public
 */
export const getMarketVolume = asyncHandler(async (req, res) => {
  const { interval = '24h', groupBy = 'hour' } = req.query;

  // Determine time interval and grouping
  const timeMap = {
    '24h': '24 hours',
    '7d': '7 days',
    '30d': '30 days',
    '1y': '1 year',
  };
  const timeInterval = timeMap[interval] || '24 hours';

  const groupByMap = {
    hour: '1 hour',
    day: '1 day',
    week: '1 week',
    month: '1 month',
  };
  const groupByInterval = groupByMap[groupBy] || '1 hour';

  // Query volume data with time-series grouping
  const volumeData = await query(
    `SELECT 
      date_trunc($1, timestamp) as time_bucket,
      COALESCE(SUM(CAST(cost AS NUMERIC)), 0) as volume,
      COUNT(*) as trades
    FROM market_events 
    WHERE event_type IN ($2, $3) 
      AND timestamp > NOW() - INTERVAL '${timeInterval}'
    GROUP BY time_bucket 
    ORDER BY time_bucket ASC`,
    [groupBy === 'hour' ? 'hour' : groupBy === 'day' ? 'day' : groupBy === 'week' ? 'week' : 'month', 'SharesPurchased', 'SharesSold']
  );

  const data = volumeData.rows.map(row => ({
    timestamp: row.time_bucket,
    volume: row.volume?.toString() || '0',
    trades: parseInt(row.trades, 10) || 0,
  }));

  sendSuccess(res, { interval, groupBy, data }, 'Volume data retrieved successfully');
});

/**
 * @desc    Get trending markets
 * @route   GET /api/v1/analytics/trending
 * @access  Public
 */
export const getTrendingMarkets = asyncHandler(async (req, res) => {
  const { limit = 10, timeframe = '24h' } = req.query;

  // Map timeframe to SQL interval
  const timeMap = {
    '24h': '24 hours',
    '7d': '7 days',
    '30d': '30 days',
  };
  const timeInterval = timeMap[timeframe] || '24 hours';

  // Get trending markets by volume, activity, and comments
  const trendingResult = await query(
    `SELECT 
      m.id as market_id,
      m.question,
      m.category,
      m.status,
      m.outcomes,
      COALESCE(SUM(CAST(me.cost AS NUMERIC)), 0) as volume_24h,
      COUNT(DISTINCT me.id) as trades_24h,
      COUNT(DISTINCT c.id) as comments
    FROM markets m
    LEFT JOIN market_events me ON m.id = me.market_id 
      AND me.event_type IN ('SharesPurchased', 'SharesSold')
      AND me.timestamp > NOW() - INTERVAL '${timeInterval}'
    LEFT JOIN comments c ON m.id = c.market_id
      AND c.created_at > NOW() - INTERVAL '${timeInterval}'
    WHERE m.status = 'active'
    GROUP BY m.id
    ORDER BY volume_24h DESC, trades_24h DESC, comments DESC
    LIMIT $1`,
    [parseInt(limit, 10)]
  );

  const trending = trendingResult.rows.map(row => ({
    marketId: row.market_id,
    question: row.question,
    category: row.category,
    volume24h: row.volume_24h?.toString() || '0',
    trades24h: parseInt(row.trades_24h, 10) || 0,
    comments: parseInt(row.comments, 10) || 0,
    outcomes: typeof row.outcomes === 'string' ? JSON.parse(row.outcomes) : row.outcomes,
  }));

  sendSuccess(res, trending, 'Trending markets retrieved successfully');
});

