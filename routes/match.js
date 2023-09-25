import { Router } from "express";

const router = Router();

import * as matchController from '../controllers/match.js';

// Create a match
router.post('/', matchController.createMatch);

export default router;