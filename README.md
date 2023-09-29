# Gameday Gold-Backend

## Project Description 
Game Day Gold is an innovative sports betting app designed for both beginners and enthusiasts. Powered by The Odds API, it offers users a realistic experience of sports betting without any actual financial risk. With a seamless login system, users can create accounts and have their Wallets, where they'll accumulate and manage their in-app currency, "Gold."
The app's primary goal is to educate users about the intricacies of sports betting, making it an ideal platform for those looking to learn the ropes. Whether you're a seasoned sports fanatic or just starting to explore the world of sports betting, Game Day Gold provides a safe and engaging environment to hone your betting skills while having fun.

## Endpoints
Bet Routes:
- "/:userId" - Used for creating a Bet
- "/:userId/:id" - Used for both updating and getting a single bet

User Routes:
- '/:id' - Used to get, delete and update user's credits 

## Models 
Bet Schema:
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
        enum: ['Moneyline', 'O/U','Spread'],
        required: true
    },
    subtype: {
        type: String,
        enum: ['Over', 'Under'],
    },
    betValue: {
        type: Number,
        required: true
    },
    team: {
        type: String,
    },
    price: {
        type: Number
    },
    potentialReturn: Number,
    point: Number,
    outcome: {
        type: String,
        enum: ['win', 'lose', 'pending'],
        default: 'pending'
    }

User Schema:
username: {
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
      default: 1000
  },
  bets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bet'
    }
  ]
