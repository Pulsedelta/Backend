import express from 'express';
import {
  getUserProfile,
  getUserPositions,
  getUserHistory,
} from '../controllers/userController.js';

const router = express.Router();

/**
 * @route   GET /api/v1/users/:address
 * @desc    Get user profile
 * @access  Public
 */
router.get('/:address', getUserProfile);

/**
 * @route   GET /api/v1/users/:address/positions
 * @desc    Get user's open positions
 * @access  Public
 */
router.get('/:address/positions', getUserPositions);

/**
 * @route   GET /api/v1/users/:address/history
 * @desc    Get user's trading history
 * @access  Public
 */
router.get('/:address/history', getUserHistory);

export default router;

