import User from "../models/User.js";

export async function getProfile(req, res) {
  try {
    // Get the user ID from the request, possibly from authentication
    const userId = req.params.id; // Replace with the actual way to get the user ID

    // Query the User model to find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      // If the user is not found, return a 404 Not Found response
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user's profile data in the response
    res.json(user);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteUser(req, res) {
  try {
    console.log(req)
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Bet.deleteMany({ user: userId });

    res.json({ message: "User and associated bets deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function addCredits(req, res) {
  try {
    // Assuming you're sending the user id in params and the amount in the request body.
    console.log("addCredits params.id :", req.params.id)
    const userId = req.params.id;
    const { amount } = req.body; // The amount to be added, sent in the request body.
    
    if(!amount || isNaN(amount)) {
      return res.status(400).json({ message: "Invalid amount" });
    }
    
    // Find the user by id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's credits
    user.virtualMoney += amount; // Assuming you have a credits field in your user model.
    console.log("In addCredits backend ", user.virtualMoney)
    await user.save(); // Save the updated user document.
    console.log("In addCredits backend after user.save :", user.virtualMoney)
    
    res.json({ message: "Credits added successfully", credits: user.credits });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
