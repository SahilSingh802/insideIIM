import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import { requestLogger, logger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import analyzeRoutes from './routes/analyze.routes.js';

// Initialize Express app
const app = express();

// ==========================================
// Middlewares
// ==========================================
// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse incoming JSON payloads
app.use(express.json());

// Log HTTP requests
app.use(requestLogger);

// ==========================================
// Routes
// ==========================================
// Health check endpoint for deployment monitoring
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

import rateLimit from 'express-rate-limit';

// ==========================================
// Rate Limiting
// ==========================================
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: { success: false, error: { message: 'Too many requests from this IP, please try again after 15 minutes.' } },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// API Routes
app.use('/api/analyze', apiLimiter, analyzeRoutes);

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({ success: false, error: { message: 'Route not found' } });
});

// ==========================================
// Global Error Handler
// ==========================================
// Must be placed after all routes
app.use(errorHandler);

// ==========================================
// Start Server
// ==========================================
app.listen(config.port, () => {
  logger.info(`Server is running in ${config.env} mode on port ${config.port}`);
});

export default app; // Export for potential serverless usage (e.g. Vercel)
