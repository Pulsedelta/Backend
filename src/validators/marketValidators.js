import { param, query } from 'express-validator';

/**
 * Validation rules for market routes
 */

export const validateMarketId = [
  param('marketId')
    .matches(/^0x[a-fA-F0-9]{40}$/)
    .withMessage('Invalid market ID format (must be a valid Ethereum address)'),
];

export const validateGetAllMarkets = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('status')
    .optional()
    .isIn(['active', 'resolved', 'invalid', 'paused'])
    .withMessage('Invalid status value'),
  query('category')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Category must be a string with max 50 characters'),
];

export const validateGetMarketHistory = [
  ...validateMarketId,
  query('interval')
    .optional()
    .isIn(['1m', '5m', '15m', '1h', '4h', '1d'])
    .withMessage('Invalid interval value'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 1000 })
    .withMessage('Limit must be between 1 and 1000'),
];

