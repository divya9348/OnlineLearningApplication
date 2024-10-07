const express=require('express');
const router=express.Router();
const studentControler=require('../Controlers/signupStudentControler');

router.post('/signup',studentControler.createStudentControler);

router.post('/contactus',studentControler.contactUsController);


module.exports=router;