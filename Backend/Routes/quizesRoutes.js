const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const quizController = require('../Controlers/quizControler');



router.post('/create', authMiddleware.verifyToken, quizController.createQuiz);

router.post('/submit/:quizId', authMiddleware.verifyToken, quizController.submitQuiz);

router.get('/results/:quizId', authMiddleware.verifyToken, quizController.getQuizResults);

module.exports = router;