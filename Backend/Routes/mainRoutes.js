const express=require('express');
const router=express.Router();
const authRouter=require('./authRoutes');
const studentRouter=require('./studentRoute');
const courseRouter=require('./courseRoutes');
const lessonRouter= require('./lessionRoutes');
const materialRoutes=require('./materialRoute');
const quizRoutes=require('./quizesRoutes')


router.use('/auth',authRouter);
router.use('/student',studentRouter);
router.use('/courses', courseRouter);
router.use('/lessons',lessonRouter);
router.use('/materials',materialRoutes);
router.use('/quizes',quizRoutes);


module.exports=router;