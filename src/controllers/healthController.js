import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import { config } from '../config/index.js';
import pkg from 'pg';
const { Pool } = pkg;

/**
 * @desc    Basic health check
 * @route   GET /health
 * @access  Public
 */
export const getHealth = asyncHandler(async (req, res) => {
  sendSuccess(res, {
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  }, 'Service is healthy');
});

/**
 * @desc    Detailed health check with service status
 * @route   GET /health/detailed
 * @access  Public
 */
export const getHealthDetailed = asyncHandler(async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.server.env,
    services: {
      api: 'healthy',
      database: 'unknown',
      blockchain: 'unknown',
      oracle: config.oracle.enabled ? 'enabled' : 'disabled',
      ai: config.ai.enabled ? 'enabled' : 'disabled',
    },
  };

  // Check database connection
  try {
    const pool = new Pool({
      host: config.database.host,
      port: config.database.port,
      database: config.database.name,
      user: config.database.user,
      password: config.database.password,
    });
    await pool.query('SELECT 1');
    health.services.database = 'healthy';
    await pool.end();
  } catch (error) {
    health.services.database = 'unhealthy';
    health.status = 'degraded';
  }

  // Check blockchain connection
  try {
    // We'll implement this when we set up the blockchain client
    health.services.blockchain = 'not_configured';
  } catch (error) {
    health.services.blockchain = 'unhealthy';
    health.status = 'degraded';
  }

  sendSuccess(res, health, 'Health check completed');
});

