import Bet from "../models/Bet.js";
import User from "../models/User.js";

export async function createBet(req, res) {
  console.log(req.body,"Looook heeerrrrrreee");
  try {
    // Extract data from the request body

    const{type, team, price, betValue, match, potentialReturn, subtype, point} = req.body;
    
    // Get the user ID from the request, possibly from authentication
    const userId = req.params.userId; // Replace with the actual way to get the user ID
    console.log(userId);
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log(`User's virtual money: ${user.virtualMoney}, Bet amount: ${betValue}`);
   
    // Check if the user's virtual money minus the bet amount is less than 0
    if (Number(user.virtualMoney) - Number(betValue) < 0) {
      return res
        .status(400)
        .json({ error: "You do not have enough money to place this bet." });
    }

    // Create a new bet instance
    const newBet = new Bet({
      user: user._id, // Set the user field to the user object
      match,
      type,
      subtype,
      betValue,
      team,
      price,
      potentialReturn, 
      point,
      outcome: "pending", // The initial outcome is set to 'pending'
    });

    // Save the new bet to the database
    await newBet.save();

    // You can add this bet to the user's bets array
    user.bets.push(newBet);

    // Update the user's virtual money balance (subtract the bet amount)
    user.virtualMoney -= betValue;

    // Save the updated user object
    await user.save();

    res.status(201).json(newBet); // Respond with the created bet
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the bet." });
  }
}

export async function getSingleBet(req, res) {
  try {
    const { userId, id } = req.params;

    // console.log(req.params);

    if (!id) {
      return res.status(404).json({ message: "Bet not Found" });
    }

    const bet = await Bet.findById(id);

    res.status(200).json(bet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
