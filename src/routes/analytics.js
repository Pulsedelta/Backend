import express from 'express';
import {
  getPlatformStats,
  getMarketVolume,
  getTrendingMarkets,
} from '../controllers/analyticsController.js';

const router = express.Router();

/**
 * @route   GET /api/v1/analytics/platform
 * @desc    Get platform-wide statistics
 * @access  Public
 */
router.get('/platform', getPlatformStats);

/**
 * @route   GET /api/v1/analytics/volume
 * @desc    Get trading volume data
 * @access  Public
 */
router.get('/volume', getMarketVolume);

/**
 * @route   GET /api/v1/analytics/trending
 * @desc    Get trending markets
 * @access  Public
 */
router.get('/trending', getTrendingMarkets);

export default router;

