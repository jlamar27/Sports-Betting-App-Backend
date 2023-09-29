import Bet from "../models/Bet.js";
import User from "../models/User.js";

export async function createBet(req, res) {
  console.log(req.body, "Looook heeerrrrrreee");

  try {
    const response = req.body;
    const mergedBetSlip = response.mergedBetSlip;
    let newBets = [];

    if (mergedBetSlip.length > 0) {
      for (let i = 0; i < mergedBetSlip.length; i++) {

        const bet = mergedBetSlip[i];

        const userId = req.params.userId; 
        const user = await User.findById(userId);

        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        console.log(`User's virtual money: ${user.virtualMoney}, Bet amount: ${bet.betValue}`);

        // Check if the user's virtual money minus the bet amount is less than 0
        if (Number(user.virtualMoney) - Number(bet.betValue) < 0) {
          return res
            .status(400)
            .json({ error: "You do not have enough money to place this bet." });
        }

        const newBet = new Bet({
          user: user._id,
          match: bet.match,
          betType: bet.type,
          subtype: bet.subtype,
          betValue: bet.betValue,
          team: bet.team,
          odds: bet.price,
          potentialReturn: bet.potentialReturn,
          point: bet.point,
          outcome: "pending", // The initial outcome is set to 'pending'
        });

        await newBet.save();

        newBets.push(newBet);

        user.bets.push(newBet);

        // Update the user's virtual money balance (subtract the bet amount)
        user.virtualMoney -= bet.betValue;

        await user.save();

      }
    }
    res.status(201).json(newBets);
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

    console.log(req.params);

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

export async function updateBet(req, res) {
  try {
    const { outcome } = req.body; // Get betId and outcome from the request body

    const user = await User.findById(req.params.userId);

    const updatedBet = await Bet.findByIdAndUpdate(req.params.id, { outcome }, { new: true });

    if(!updatedBet) {
      return res.status(404).json({ error: 'Bet not found' });
    }

    if (outcome === 'win') {
      user.virtualMoney += updatedBet.potentialReturn;
      await user.save();
    }

    res.status(200).json(updatedBet);
  } catch(error) {
    console.log("In backend updateBet catch error portion");
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the bet.' });
  }
}

