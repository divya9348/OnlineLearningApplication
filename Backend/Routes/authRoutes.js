const express=require('express');
const router=express.Router();
const authMiddleware=require('../Middlewares/authMiddleware')
const authControler=require('../Controlers/authControler');

router.post('/login',authControler.signinControler);
router.post('/socialLogin',authControler.socialLoginControler);
router.get('/user/profile',authMiddleware.verifyToken, authControler.getUserProfile);

module.exports=router;