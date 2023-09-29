import express from "express";
const router = express.Router();

import verifyAuth from "../middlewares/verifyAuth.js";

import * as betController from "../controllers/bet.js";


// create a bet
router.post("/:userId", verifyAuth, betController.createBet);

// get a single bet by its id
router.get("/:userId/:id", verifyAuth, betController.getSingleBet);

// Update a bet’s outcome
router.post("/:userId/:id", verifyAuth, betController.updateBet);

export default router;
