import express from 'express';
import {
  getMarketComments,
  createComment,
  deleteComment,
} from '../controllers/commentController.js';
import {
  validateGetComments,
  validateCreateComment,
  validateCommentId,
} from '../validators/commentValidators.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

/**
 * @route   GET /api/v1/comments/market/:marketId
 * @desc    Get all comments for a market
 * @access  Public
 */
router.get('/market/:marketId', validateGetComments, validateRequest, getMarketComments);

/**
 * @route   POST /api/v1/comments
 * @desc    Create a new comment
 * @access  Public (will add auth later)
 */
router.post('/', validateCreateComment, validateRequest, createComment);

/**
 * @route   DELETE /api/v1/comments/:commentId
 * @desc    Delete a comment (own comments only)
 * @access  Public (will add auth later)
 */
router.delete('/:commentId', validateCommentId, validateRequest, deleteComment);

export default router;

