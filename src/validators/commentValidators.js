import { body, param, query } from 'express-validator';

/**
 * Validation rules for comment routes
 */

export const validateMarketId = [
  param('marketId')
    .matches(/^0x[a-fA-F0-9]{40}$/)
    .withMessage('Invalid market ID format'),
];

export const validateCreateComment = [
  body('marketId')
    .matches(/^0x[a-fA-F0-9]{40}$/)
    .withMessage('Invalid market ID format'),
  body('userAddress')
    .matches(/^0x[a-fA-F0-9]{40}$/)
    .withMessage('Invalid user address format'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Comment content is required')
    .isLength({ min: 3, max: 1000 })
    .withMessage('Comment must be between 3 and 1000 characters'),
  body('parentCommentId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Parent comment ID must be a positive integer'),
];

export const validateCommentId = [
  param('commentId')
    .isInt({ min: 1 })
    .withMessage('Invalid comment ID'),
];

export const validateGetComments = [
  ...validateMarketId,
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
];

