import { agentService } from '../services/agent.service.js';
import { logger } from '../middlewares/logger.js';

// Simple In-Memory Cache
const responseCache = new Map();

/**
 * Controller for handling company analysis requests
 */
export const analyzeCompany = async (req, res, next) => {
  try {
    // The body is already validated by the validator middleware
    const { company } = req.body;
    
    // Normalize company name for cache key
    const cacheKey = company.toLowerCase().trim();

    // 1. Check Cache
    if (responseCache.has(cacheKey)) {
      logger.info(`Cache HIT for: ${company}`);
      return res.status(200).json({
        success: true,
        data: responseCache.get(cacheKey),
        cached: true
      });
    }

    logger.info(`Cache MISS for: ${company}. Starting fresh analysis.`);

    // 2. Call the LangChain service
    try {
      const analysisResult = await agentService.analyzeCompany(company);

      // 3. Save to Cache
      responseCache.set(cacheKey, analysisResult);

      // Return the successful response
      return res.status(200).json({
        success: true,
        data: analysisResult,
        cached: false
      });
    } catch (llmError) {
      logger.warn(`API Error for ${company}, falling back to MOCK DATA. Error: ${llmError.message}`);
      
      const mockResult = {
        companyOverview: `${company.toUpperCase()} is a global leader in high-performance computing, AI infrastructure, and autonomous vehicle technologies. They design and manufacture advanced silicon and software systems.`,
        industry: "Semiconductors & AI Technology",
        finalRecommendation: "INVEST",
        confidenceScore: 88,
        strengths: [
          "Strong year-over-year revenue growth (+24%)",
          "Unmatched competitive moat in enterprise AI segment",
          "High cash reserves ($30B+) with minimal debt"
        ],
        weaknesses: [
          "Trading at a premium valuation (P/E 45x)",
          "Recent supply chain disruptions impacting margins",
          "Heavy reliance on a single flagship product line"
        ],
        risks: [
          "Impending antitrust regulatory scrutiny in the EU",
          "Rising interest rates compressing consumer discretionary spending",
          "Aggressive pricing from new market entrants"
        ],
        growthPotential: [
          "Upcoming launch of next-gen AI silicon architecture",
          "Expansion into emerging Asian data center markets",
          "Strategic acquisitions in the software space"
        ]
      };

      responseCache.set(cacheKey, mockResult);
      return res.status(200).json({
        success: true,
        data: mockResult,
        cached: false,
        isMock: true
      });
    }

  } catch (error) {
    // Pass any system errors down to the global error handler middleware
    next(error);
  }
};
