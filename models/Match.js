import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    matchId: {
        type: String,
        required: true,
        unique: true
    },
    awayTeam: {
        type: String,
        required: true
    },
    homeTeam: {
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
    overUnderOdds: Number,
    spread: Number,
});


export default mongoose.model('Match', matchSchema);
