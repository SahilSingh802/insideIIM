import { PromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';

// ==========================================
// Zod Schema for Structured Output
// ==========================================
export const analysisSchema = z.object({
  companyOverview: z.string().describe("A concise summary of what the company does and its business model."),
  industry: z.string().describe("The primary industry or sector of the company."),
  strengths: z.array(z.string()).describe("List of bullish indicators, competitive moats, and strengths."),
  weaknesses: z.array(z.string()).describe("List of bearish indicators, flaws, and weaknesses."),
  risks: z.array(z.string()).describe("Key macroeconomic, regulatory, or company-specific risks."),
  growthPotential: z.array(z.string()).describe("Upcoming catalysts or macro trends driving future growth potential."),
  finalRecommendation: z.enum(["INVEST", "PASS"]).describe("The definitive binary decision based on the research criteria."),
  confidenceScore: z.number().min(0).max(100).describe("Confidence score from 0 to 100 based on data quality.")
});

// ==========================================
// Phase 1: The Researcher Prompt
// ==========================================
export const RESEARCHER_PROMPT = `You are a highly quantitative Wall Street Investment Analyst at a top-tier hedge fund. You deal in hard facts, numbers, and market realities.

Your objective is to research the target company and gather raw data on:
1. Company Overview & Industry Context
2. Strengths (Bullish indicators)
3. Weaknesses (Bearish indicators)
4. Specific Risks
5. Concrete Growth Potential and catalysts

CRITERIA FOR 'INVEST':
- Strong fundamentals, clear moat, and verifiable growth potential.

CRITERIA FOR 'PASS':
- Weak fundamentals, high debt, regulatory threats, or overvaluation.

Search the web until you have enough raw data to support a concise, professional investment thesis.
Your final answer must be a detailed markdown document of your raw findings.
`;

export const analyzePromptTemplate = PromptTemplate.fromTemplate(`
Analyze the following company: {company}

Gather facts, numbers, and news using your tools before returning the final summary.
`);

// ==========================================
// Phase 2: The Synthesizer Prompt
// ==========================================
export const SYNTHESIZER_PROMPT = PromptTemplate.fromTemplate(`
You are a Lead Portfolio Manager. Extract the raw research notes below into a strict, concise investment brief.

TONE & STYLE:
- Brutally concise and professional.
- Use bullet points for strengths, weaknesses, risks, and growth potential. Keep them under 15 words each.
- Do NOT use generic ChatGPT phrasing.

ANTI-HALLUCINATION:
- Base all claims ONLY on the provided notes. Do not guess numbers.

RESEARCH NOTES:
{notes}
`);
