import express from 'express';
import {
  getAllMarkets,
  getMarketById,
  getMarketPrices,
  getMarketHistory,
  getMarketAIForecast,
} from '../controllers/marketController.js';
import {
  validateMarketId,
  validateGetAllMarkets,
  validateGetMarketHistory,
} from '../validators/marketValidators.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

/**
 * @route   GET /api/v1/markets
 * @desc    Get all markets with filters
 * @access  Public
 */
router.get('/', validateGetAllMarkets, validateRequest, getAllMarkets);

/**
 * @route   GET /api/v1/markets/:marketId
 * @desc    Get single market details
 * @access  Public
 */
router.get('/:marketId', validateMarketId, validateRequest, getMarketById);

/**
 * @route   GET /api/v1/markets/:marketId/prices
 * @desc    Get current prices for market outcomes
 * @access  Public
 */
router.get('/:marketId/prices', validateMarketId, validateRequest, getMarketPrices);

/**
 * @route   GET /api/v1/markets/:marketId/history
 * @desc    Get historical data for market
 * @access  Public
 */
router.get('/:marketId/history', validateGetMarketHistory, validateRequest, getMarketHistory);

/**
 * @route   GET /api/v1/markets/:marketId/forecast
 * @desc    Get AI forecast for market
 * @access  Public
 */
router.get('/:marketId/forecast', validateMarketId, validateRequest, getMarketAIForecast);

export default router;

