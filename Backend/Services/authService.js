const studentData = require('../Models/studentDataSchema');
const commonHelper = require('../Helpers/commonHelper');
const authMiddleware=require('../Middlewares/authMiddleware');

const { OAuth2Client } = require('google-auth-library'); // Example for Google
const axios = require('axios'); // Example for Facebook



async function signinService(Email, Password) {
    const user = await studentData.findOne({ Email })
    if (user) {
        const validPassword = await commonHelper.comparePassword(Password, user.Password);
        if (validPassword) {
            const token = await authMiddleware.generateToken({user});

            return {
                success: true,
                message: 'Login successful',
                token,
                user
            }
        }else{
            return { success: false, message: 'Password Incorrect!' };
        }
    }else{
        return { success: false, message: 'User not found' };
    }
}
const socialLoginService = async (provider, accessToken) => {
    let userProfile;
  
    if (provider == 'google') {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: accessToken,
        audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      });
      userProfile = ticket.getPayload();
    } else if (provider === 'facebook') {
      const response = await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture`);
      userProfile = response.data;
    } 
    else {
      throw new Error('Unsupported provider');
    }
  
    // Find or create the user in your database
    
    let user = await studentData.findOne({ socialId: userProfile.id, provider });
   
    if (!user) {
      user = new studentData({
        StudentName: userProfile.name,
        Email: userProfile.email,
        socialId: userProfile.id,
        role: 'student',
      });
      
      await user.save();
    }
    const token = await authMiddleware.generateToken({user});
  
    return {user, token};
  };
  
  const getUserProfile = async (userId) => {
    try {
        const user = await studentData.findById(userId).select('-password');
        return user;
    } catch (error) {
        throw new Error('User not found');
    }
  };
  
  const updateUserProfile = async (userId, updateData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
        return updatedUser;
    } catch (error) {
        throw new Error('Error updating user profile');
    }
  };
  

module.exports={signinService, socialLoginService, getUserProfile, updateUserProfile};