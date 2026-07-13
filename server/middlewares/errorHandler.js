import { logger } from './logger.js';

/**
 * Global error handling middleware.
 * Catches any errors thrown in route handlers or other middlewares.
 * Ensures the client always receives a JSON response, even on failure.
 */
export const errorHandler = (err, req, res, next) => {
  // Log the error for internal tracking
  logger.error(`Unhandled Exception on ${req.method} ${req.url}`, err);

  // Determine status code
  const statusCode = err.statusCode || 500;
  
  // Format the error response
  const errorResponse = {
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Only show stack trace in dev
    }
  };

  res.status(statusCode).json(errorResponse);
};
