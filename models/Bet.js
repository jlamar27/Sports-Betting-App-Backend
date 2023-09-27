import mongoose from 'mongoose';


const betSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    match: {
        type: String,
        required: true
    },
    betType: {
        type: String,
        enum: ['moneyLine', 'overUnder','spread'],
        required: true
    },
    betValue: {
        type: Number,
        required: true
    },
    team: {
        type: String,
    },
    odds: {
        type: Number
    },
    potentialReturn: Number,
    outcome: {
        type: String,
        enum: ['win', 'lose', 'pending'],
        default: 'pending'
    }
});

export default mongoose.model('Bet', betSchema);
