import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env file
dotenv.config();

// Define a schema for required environment variables using Zod
// This ensures the application crashes early if keys are missing
const envSchema = z.object({
  PORT: z.string().default('5000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  GEMINI_API_KEY: z.string({
    required_error: "GEMINI_API_KEY is required for the AI agent",
  }),
  TAVILY_API_KEY: z.string().optional(), // Optional, for web search tool if needed
});

// Validate environment variables
const envVars = envSchema.safeParse(process.env);

if (!envVars.success) {
  console.error('❌ Invalid environment variables:', envVars.error.format());
  process.exit(1);
}

export const config = {
  port: parseInt(envVars.data.PORT, 10),
  env: envVars.data.NODE_ENV,
  geminiApiKey: envVars.data.GEMINI_API_KEY,
  tavilyApiKey: envVars.data.TAVILY_API_KEY,
};
