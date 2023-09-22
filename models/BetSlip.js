const { Schema, model } = require("../connection/db")
const mongoose = require('mongoose');

const betSlipSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bet'
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    potentialReturn: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'closed', 'canceled'],
        default: 'active'
    },
    outcome: {
        type: String,
        enum: ['win', 'lose', 'pending'],
        default: 'pending'
    }
});

module.exports = mongoose.model('BetSlip', betSlipSchema);
