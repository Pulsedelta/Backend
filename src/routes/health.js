import express from 'express';
import { getHealth, getHealthDetailed } from '../controllers/healthController.js';

const router = express.Router();

/**
 * @route   GET /health
 * @desc    Basic health check
 * @access  Public
 */
router.get('/', getHealth);

/**
 * @route   GET /health/detailed
 * @desc    Detailed health check with service status
 * @access  Public
 */
router.get('/detailed', getHealthDetailed);

export default router;

