const { Schema, model } = require("../connection/db")
const mongoose = require('mongoose');


const betSchema = new mongoose.Schema({
    match: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match',
        required: true
    },
    betType: {
        type: String,
        enum: ['moneyLine', 'overUnder'],
        required: true
    },
    betValue: {
        type: String,
        required: true
    },
    betAmount: {
        type: Number,
        required: true
    },
    potentialReturn: Number,
    outcome: {
        type: String,
        enum: ['win', 'lose', 'pending'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Bet', betSchema);
