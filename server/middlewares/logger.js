import morgan from 'morgan';

/**
 * Creates a configured Morgan logger middleware
 * - In development: uses 'dev' format (colored, concise)
 * - In production: uses 'combined' format (standard Apache log format)
 */
export const requestLogger = morgan(
  process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
);

/**
 * Custom logger utility for consistent application-level logging
 */
export const logger = {
  info: (message, meta = {}) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, Object.keys(meta).length ? meta : '');
  },
  error: (message, error) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error?.message || error);
    if (error?.stack && process.env.NODE_ENV !== 'production') {
      console.error(error.stack);
    }
  },
  warn: (message, meta = {}) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, Object.keys(meta).length ? meta : '');
  }
};
