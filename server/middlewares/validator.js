import { z } from 'zod';
import { logger } from './logger.js';

/**
 * Middleware factory for validating request bodies using Zod schemas.
 * @param {z.ZodSchema} schema - The Zod schema to validate against
 */
export const validateBody = (schema) => {
  return (req, res, next) => {
    try {
      // Attempt to parse the request body against the schema
      const validData = schema.parse(req.body);
      
      // Replace the request body with the validated/sanitized data
      req.body = validData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.warn('Validation error on request', { path: req.path, errors: error.errors });
        // Format Zod errors nicely for the client
        return res.status(400).json({
          success: false,
          error: {
            message: 'Invalid request data',
            details: error.errors.map(e => ({ path: e.path.join('.'), message: e.message }))
          }
        });
      }
      next(error);
    }
  };
};

// Define specific schemas here for reuse
export const schemas = {
  analyzeRequest: z.object({
    company: z.string().min(2, "Company name must be at least 2 characters").max(100, "Company name is too long"),
  })
};
