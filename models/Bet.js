import mongoose from 'mongoose';


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

export default mongoose.model('Bet', betSchema);
