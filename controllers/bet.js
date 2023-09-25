import Bet from '../models/Bet.js'


export async function createBet(req, res) {
  try {
    // Extract data from the request body
    const { match, betType, betAmount } = req.body;

    // Create a new bet instance
    const newBet = new Bet({
      match,
      betType,
      betAmount,
      potentialReturn: 0, // You can calculate this based on the bet type and amount
      outcome: 'pending', // The initial outcome is set to 'pending'
    });

    // Save the new bet to the database
    await newBet.save();
    
    // You can add this bet to the user's bets array
    req.user.bets.push(newBet);

    // Update the user's virtual money balance (subtract the bet amount)
    req.user.virtualMoney -= betAmount;

    // Save the updated user object
    await req.user.save();

    res.status(201).json(newBet); // Respond with the created bet
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the bet.' });
  }
}


export async function getSingleBet(req, res) {
  try {
    const { id } = req.params;


    if (!bet) {
      return res.status(404).json({message:'Bet not Found'});
    }

    res.status(200).json({bet});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal server error'})
  }
}
