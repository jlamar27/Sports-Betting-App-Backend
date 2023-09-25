import User from '../models/User.js'

export async function getProfile(req, res) {
    try {
        // Get the user ID from the request, possibly from authentication
        const userId = req.params.id; // Replace with the actual way to get the user ID

        // Query the User model to find the user by their ID
        const user = await User.findById(userId);

        if (!user) {
            // If the user is not found, return a 404 Not Found response
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the user's profile data in the response
        res.json(user);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
