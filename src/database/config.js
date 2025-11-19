import pkg from 'pg';
const { Pool } = pkg;
import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';

/**
 * PostgreSQL Connection Pool
 */
export const pool = new Pool({
  host: config.database.host,
  port: config.database.port,
  database: config.database.name,
  user: config.database.user,
  password: config.database.password,
  min: config.database.pool.min,
  max: config.database.pool.max,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test database connection
pool.on('connect', () => {
  logger.info('🗄️  Database connection established');
});

pool.on('error', (err) => {
  logger.error('Database connection error:', err);
  process.exit(-1);
});

/**
 * Query helper function
 * @param {string} text - SQL query
 * @param {array} params - Query parameters
 * @returns {Promise} - Query result
 */
export const query = async (text, params) => {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    logger.debug('Executed query', { text, duration, rows: result.rowCount });
    return result;
  } catch (error) {
    logger.error('Database query error:', { text, error: error.message });
    throw error;
  }
};

/**
 * Get a client from the pool for transactions
 * @returns {Promise} - Pool client
 */
export const getClient = async () => {
  const client = await pool.connect();
  const query = client.query;
  const release = client.release;

  // Set a timeout of 5 seconds, after which we will log this client's last query
  const timeout = setTimeout(() => {
    logger.error('A client has been checked out for more than 5 seconds!');
  }, 5000);

  // Monkey patch the query method to keep track of the last query executed
  client.query = (...args) => {
    client.lastQuery = args;
    return query.apply(client, args);
  };

  // Monkey patch the release method to clear our timeout
  client.release = () => {
    clearTimeout(timeout);
    // Set the methods back to their old un-monkey-patched version
    client.query = query;
    client.release = release;
    return release.apply(client);
  };

  return client;
};

export default {
  pool,
  query,
  getClient,
};

