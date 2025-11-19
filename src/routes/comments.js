import express from 'express';
import {
  getMarketComments,
  createComment,
  deleteComment,
} from '../controllers/commentController.js';

const router = express.Router();

/**
 * @route   GET /api/v1/comments/market/:marketId
 * @desc    Get all comments for a market
 * @access  Public
 */
router.get('/market/:marketId', getMarketComments);

/**
 * @route   POST /api/v1/comments
 * @desc    Create a new comment
 * @access  Public (will add auth later)
 */
router.post('/', createComment);

/**
 * @route   DELETE /api/v1/comments/:commentId
 * @desc    Delete a comment (own comments only)
 * @access  Public (will add auth later)
 */
router.delete('/:commentId', deleteComment);

export default router;

