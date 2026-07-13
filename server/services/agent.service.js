import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { AgentExecutor, createReactAgent } from 'langchain/agents';
import { TavilySearchResults } from '@langchain/community/tools/tavily_search';
import { PromptTemplate } from '@langchain/core/prompts';
import { config } from '../config/env.js';
import { RESEARCHER_PROMPT, SYNTHESIZER_PROMPT, analysisSchema } from '../utils/prompts.js';
import { logger } from '../middlewares/logger.js';

class AgentService {
  constructor() {
    // Model for Phase 1: Research (Needs reasoning)
    this.researchModel = new ChatGoogleGenerativeAI({
      apiKey: config.geminiApiKey,
      modelName: 'gemini-1.5-flash',
      temperature: 0.2, 
    });

    // Model for Phase 2: Synthesis (Needs strict adherence to schema)
    this.synthesisModel = new ChatGoogleGenerativeAI({
      apiKey: config.geminiApiKey,
      modelName: 'gemini-1.5-flash',
      temperature: 0, // 0 temperature to strictly prevent hallucination
    });

    this.tools = [];
    if (config.tavilyApiKey) {
      this.tools.push(new TavilySearchResults({
        maxResults: 4,
        apiKey: config.tavilyApiKey,
      }));
    } else {
      logger.warn("TAVILY_API_KEY is not set. The agent will rely on pre-trained knowledge.");
    }
  }

  async analyzeCompany(companyName) {
    try {
      logger.info(`Phase 1: Starting research for company: ${companyName}`);

      // ==========================================
      // Phase 1: Research
      // ==========================================
      const researcherPrompt = PromptTemplate.fromTemplate(`
        ${RESEARCHER_PROMPT}

        TOOLS:
        ------
        You have access to the following tools:

        {tools}

        To use a tool, please use the following format:
        \`\`\`
        Thought: Do I need to use a tool? Yes
        Action: the action to take, should be one of [{tool_names}]
        Action Input: the input to the action
        Observation: the result of the action
        \`\`\`

        When you have gathered enough information, you MUST use the format:
        \`\`\`
        Thought: Do I need to use a tool? No
        Final Answer: [A massive, detailed markdown summary of all facts gathered.]
        \`\`\`

        Begin!

        Company to analyze: ${companyName}
        Thought: {agent_scratchpad}
      `);

      const agent = await createReactAgent({
        llm: this.researchModel,
        tools: this.tools,
        prompt: researcherPrompt,
      });

      const agentExecutor = new AgentExecutor({
        agent,
        tools: this.tools,
        maxIterations: 6,
        verbose: process.env.NODE_ENV === 'development',
      });

      const researchResult = await agentExecutor.invoke({
        input: companyName,
      });

      const rawNotes = researchResult.output;
      logger.info(`Phase 1 Complete. Raw notes length: ${rawNotes.length} characters.`);

      // ==========================================
      // Phase 2: Synthesis & Extraction
      // ==========================================
      logger.info(`Phase 2: Synthesizing data into structured JSON format.`);
      
      // Bind the Zod schema to the model forcing it to output valid JSON
      const structuredLlm = this.synthesisModel.withStructuredOutput(analysisSchema);
      
      // Create a simple chain
      const synthesizerChain = SYNTHESIZER_PROMPT.pipe(structuredLlm);
      
      // Execute extraction
      const finalJson = await synthesizerChain.invoke({
        notes: rawNotes
      });

      logger.info(`Phase 2 Complete. Analysis for ${companyName} finished successfully.`);
      
      return finalJson;

    } catch (error) {
      logger.error(`Error in AgentService for ${companyName}:`, error);
      throw error;
    }
  }
}

export const agentService = new AgentService();
