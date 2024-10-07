const express = require('express');
const router = express.Router();
const lessonController = require('../Controlers/lessonControler');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create/:courseId', authMiddleware.verifyToken, lessonController.createLesson);
router.get('/:courseId',authMiddleware.verifyToken, lessonController.getLessonsByCourse);
router.put('/:id', authMiddleware.verifyToken, lessonController.updateLesson);
router.delete('/:id', authMiddleware.verifyToken, lessonController.deleteLesson);

module.exports = router;
