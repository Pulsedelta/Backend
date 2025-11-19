import express from 'express';
import {
  getAllMarkets,
  getMarketById,
  getMarketPrices,
  getMarketHistory,
  getMarketAIForecast,
} from '../controllers/marketController.js';

const router = express.Router();

/**
 * @route   GET /api/v1/markets
 * @desc    Get all markets with filters
 * @access  Public
 */
router.get('/', getAllMarkets);

/**
 * @route   GET /api/v1/markets/:marketId
 * @desc    Get single market details
 * @access  Public
 */
router.get('/:marketId', getMarketById);

/**
 * @route   GET /api/v1/markets/:marketId/prices
 * @desc    Get current prices for market outcomes
 * @access  Public
 */
router.get('/:marketId/prices', getMarketPrices);

/**
 * @route   GET /api/v1/markets/:marketId/history
 * @desc    Get historical data for market
 * @access  Public
 */
router.get('/:marketId/history', getMarketHistory);

/**
 * @route   GET /api/v1/markets/:marketId/forecast
 * @desc    Get AI forecast for market
 * @access  Public
 */
router.get('/:marketId/forecast', getMarketAIForecast);

export default router;

