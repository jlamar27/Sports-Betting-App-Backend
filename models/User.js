import mongoose from "mongoose";

// define user schema
const userSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true,
      unique: true
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  hash: {
      type: String,
      required: true
  },
  virtualMoney: {
      type: Number,
      default: 1000 // Initial virtual money assigned to the user
  },
  bets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bet' // Reference the Bet model
    }
  ]
});

// export User
export default mongoose.model('User', userSchema)