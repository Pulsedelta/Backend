import express from 'express';
import {
  getUserProfile,
  getUserPositions,
  getUserHistory,
} from '../controllers/userController.js';
import { validateUserAddress, validatePagination } from '../validators/userValidators.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

/**
 * @route   GET /api/v1/users/:address
 * @desc    Get user profile
 * @access  Public
 */
router.get('/:address', validateUserAddress, validateRequest, getUserProfile);

/**
 * @route   GET /api/v1/users/:address/positions
 * @desc    Get user's open positions
 * @access  Public
 */
router.get('/:address/positions', validateUserAddress, validateRequest, getUserPositions);

/**
 * @route   GET /api/v1/users/:address/history
 * @desc    Get user's trading history
 * @access  Public
 */
router.get('/:address/history', [...validateUserAddress, ...validatePagination], validateRequest, getUserHistory);

export default router;

