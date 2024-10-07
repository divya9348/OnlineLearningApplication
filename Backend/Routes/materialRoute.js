const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const learningController = require('../Controlers/materialControler');

router.post('/upload/:courseId', authMiddleware.verifyToken, learningController.uploadLearningMaterial);

router.delete('/delete/:id', authMiddleware.verifyToken, learningController.deleteLearningMaterial);

module.exports = router;