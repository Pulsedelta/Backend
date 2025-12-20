import { query } from 'express-validator';

/**
 * Validation rules for analytics routes
 */

export const validateVolumeQuery = [
  query('interval')
    .optional()
    .isIn(['24h', '7d', '30d', '1y'])
    .withMessage('Invalid interval. Must be one of: 24h, 7d, 30d, 1y'),
  query('groupBy')
    .optional()
    .isIn(['hour', 'day', 'week', 'month'])
    .withMessage('Invalid groupBy. Must be one of: hour, day, week, month'),
];

export const validateTrendingQuery = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
  query('timeframe')
    .optional()
    .isIn(['24h', '7d', '30d'])
    .withMessage('Invalid timeframe. Must be one of: 24h, 7d, 30d'),
];

