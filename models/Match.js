const { Schema, model } = require("../connection/db")
const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    matchId: {
        type: String,
        required: true,
        unique: true
    },
    teamA: {
        type: String,
        required: true
    },
    teamB: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    moneyLineOdds: {
        teamA: Number,
        teamB: Number
    },
    overUnderOdds: Number
});


module.exports = mongoose.model('Match', matchSchema);
