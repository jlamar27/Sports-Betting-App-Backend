import express from 'express';
const router = express.Router();


import * as betController from '../controllers/bet.js';

// create a bet
router.post('/bet', betController.createBet)

// get a single bet by its id
router.get('/bet/:id', betController.getSingleBet)


export default router
