import express from 'express';
const router = express.Router();


import * as betController from '../controllers/bet.js';

// create a bet
router.post('/', betController.createBet)

// get a single bet by its id
router.get('/:id', betController.getSingleBet)


export default router
