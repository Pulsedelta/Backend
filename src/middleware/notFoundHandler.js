import { NotFoundError } from '../utils/errors.js';

/**
 * 404 Not Found Handler
 */
export const notFoundHandler = (req, res, next) => {
  const error = new NotFoundError(`Route ${req.originalUrl} not found`);
  next(error);
};

export default notFoundHandler;

