const express = require('express');
const router = express.Router();
const courseController = require('../Controlers/courseControler');
const authMiddleware = require('../Middlewares/authMiddleware');

const multer = require('multer');
const path = require('path');



// Set up multer storage and file handling
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join('uploads', 'image')); // Store files in 'uploads/image'
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname); // Ensure unique filenames
    }
  });
  
  const upload = multer({ storage: storage });

router.post('/create', authMiddleware.verifyToken,upload.single('image'), courseController.createCourse);

router.get('/', courseController.getCourses);

router.put('/update/:id', authMiddleware.verifyToken,  courseController.updateCourse);

router.delete('/delete/:id', authMiddleware.verifyToken,  courseController.deleteCourse);

router.get('/category/:category',authMiddleware.verifyToken, courseController.getCoursesByCategory);

router.post('/enroll/:courseId',authMiddleware.verifyToken, courseController.enrollInCourse);

router.post('/unenroll/:courseId',authMiddleware.verifyToken, courseController.unenrollFromCourse);

router.get('/enrolled',authMiddleware.verifyToken, courseController.getUserEnrolledCourses);

router.get('/:id',authMiddleware.verifyToken, courseController.getCourseById);

router.post('/progress/:courseId',authMiddleware.verifyToken, courseController.updateProgress);

router.get('/progress/:courseId',authMiddleware.verifyToken, courseController.getProgressForCourse);

router.get('/search', courseController.searchCourseControler);

module.exports = router;
