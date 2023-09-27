import express from "express";
const router = express.Router();

import verifyAuth from "../middlewares/verifyAuth.js";

import * as betController from "../controllers/bet.js";


// create a bet
router.post("/:userId", betController.createBet);

// get a single bet by its id
router.get("/:userId/:id", verifyAuth, betController.getSingleBet);

export default router;
