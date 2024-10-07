const authService = require('../Services/authService')
const authMiddleware = require('../Middlewares/authMiddleware');
const responseHelper = require('../Helpers/responseHelper')

// Signin controller
const signinControler = async (req, res) => {
    const { Email, Password } = req.body;


    try {
        const result = await authService.signinService(Email, Password);


        if (result.success) {
            res.status(200).json({ message: 'Login Successful', result });
        } else {
            res.status(result.message === 'User not found' ? 404 : 401).json({ message: result.message });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error fetching data', error: err.message });
    }
};

const socialLoginControler = async (req, res) => {
    try {
        const { provider, accessToken } = req.body; // Assume `provider` is the social media platform (e.g., 'google', 'facebook')
        // Call the service to authenticate the user via the social login
        const user = await authService.socialLoginService(provider, accessToken);

        res.status(200).json({ success: true, message: "User logged in successfully via social media.", token: token })
        //   responseHelper.successResponse(res,"User logged in successfully via social media." , { token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "login failed", error: error.message });
        //   responseHelper.errorResponse(res,error.message);
    }
};

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.user._id;
        const user = await authService.getUserProfile(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User profile fetched successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updateData = req.body;

        const updatedUser = await authService.updateUserProfile(userId, updateData);

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }
};

module.exports = { signinControler, socialLoginControler, getUserProfile, updateUserProfile };