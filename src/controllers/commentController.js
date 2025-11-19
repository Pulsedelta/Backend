import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import { ValidationError, NotFoundError } from '../utils/errors.js';

/**
 * @desc    Get all comments for a market
 * @route   GET /api/v1/comments/market/:marketId
 * @access  Public
 */
export const getMarketComments = asyncHandler(async (req, res) => {
  const { marketId } = req.params;
  const { page = 1, limit = 50 } = req.query;

  // TODO: Implement database query
  const mockComments = [
    {
      id: 'comment1',
      marketId,
      author: '0xabcd...',
      content: 'I think BTC will definitely hit $100k this year!',
      timestamp: new Date().toISOString(),
      upvotes: 5,
      downvotes: 1,
    },
  ];

  sendSuccess(res, mockComments, 'Comments retrieved successfully');
});

/**
 * @desc    Create a new comment
 * @route   POST /api/v1/comments
 * @access  Public
 */
export const createComment = asyncHandler(async (req, res) => {
  const { marketId, author, content } = req.body;

  // Validation
  if (!marketId || !author || !content) {
    throw new ValidationError('Market ID, author, and content are required');
  }

  if (content.length < 3 || content.length > 1000) {
    throw new ValidationError('Comment must be between 3 and 1000 characters');
  }

  // TODO: Implement database insert
  const mockComment = {
    id: 'new_comment_id',
    marketId,
    author,
    content,
    timestamp: new Date().toISOString(),
    upvotes: 0,
    downvotes: 0,
  };

  sendSuccess(res, mockComment, 'Comment created successfully', 201);
});

/**
 * @desc    Delete a comment
 * @route   DELETE /api/v1/comments/:commentId
 * @access  Public
 */
export const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { author } = req.body;

  // TODO: Implement database delete with ownership check
  // For now, just return success
  sendSuccess(res, { commentId }, 'Comment deleted successfully');
});

