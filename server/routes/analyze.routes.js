import { Router } from 'express';
import { analyzeCompany } from '../controllers/analyze.controller.js';
import { validateBody, schemas } from '../middlewares/validator.js';

const router = Router();

/**
 * POST /api/analyze
 * Body: { company: "string" }
 * Returns structured JSON analysis.
 */
router.post('/', validateBody(schemas.analyzeRequest), analyzeCompany);

export default router;
