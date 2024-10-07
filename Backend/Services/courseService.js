const Course = require('../Models/course');
const User = require('../Models/studentDataSchema');
const Enrollment = require('../Models/Enrollcourse');
const Progress = require('../Models/trackProgress');

const createCourse = async (title, description, userId, category, tags, imagePath) => {
 
  const course = new Course({
    title,
    description,
    creator: userId,
    category,
    tags,
    image: imagePath
  });

  await course.save();

  await User.findByIdAndUpdate(userId, {
    $addToSet: { createdCourses: course._id },
  });

  return course;
};


const getAllCourses = async () => {
  return await Course.find().populate('creator', 'name');
};

const getCourseById = async (courseId) => {
  return await Course.findById(courseId).populate('creator', 'name');
};

const updateCourse = async (courseId, title, description, tags, userId) => {
  const course = await Course.findById(courseId);
  if (!course) {
    throw new Error('Course not found');
  }
  if (course.creator.toString() !== userId) {
    throw new Error('User not authorized');
  }

  course.title = title || course.title;
  course.description = description || course.description;
  course.tags = tags || course.tags;

  await course.save();
  return course;
};

const deleteCourse = async (courseId, userId) => {
  const course = await Course.findById(courseId);

  if (!course) {
    throw new Error('Course not found');
  }

  if (course.creator.toString() !== userId) {
    throw new Error('User not authorized');
  }

  await course.deleteOne();
  return course;
};

const getCoursesByCategory = async (category) => {
  return await Course.find({ category });
};


const enrollInCourse = async (userId, courseId) => {
  // Check if the user is already enrolled
  const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
  
  if (existingEnrollment) {
    return { alreadyEnrolled: true };
  }

  // Fetch the course to get the number of lessons
  const course = await Course.findById(courseId);
  
  if (!course) {
    throw new Error('Course not found');
  }

  // Dynamically calculate the total number of lessons
  const totalLessons = course.lessons.length;

  // Create a new progress document with the linked course and user
  const newProgress = new Progress({
    user: userId,
    course: courseId,
    totalLessons: totalLessons, // Set dynamically based on the course
    lessonsCompleted: 0, // Initial progress
    percentage: 0, // Initial percentage
  });

  await newProgress.save();

  // Create a new enrollment document with the linked progress
  const newEnrollment = new Enrollment({
    user: userId,
    course: courseId,
    progress: newProgress._id, // Link the created progress document
  });
  
  await newEnrollment.save();

  // Optionally update the user with the enrolled course (if required)
  await User.findByIdAndUpdate(
    userId,
    {
      $push: { enrolledCourses: { courseId, progress: 0, completed: false } },
    },
    { new: true }
  );

  return newEnrollment;
};


const unenrollFromCourse = async (userId, courseId) => {
  const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
  if (!enrollment) {
    return { notEnrolled: true };
  }

  await Enrollment.deleteOne({ user: userId, course: courseId });

  await User.findByIdAndUpdate(
    userId,
    { $pull: { enrolledCourses: { courseId: courseId } } },
    { new: true }
  );

  return { success: true };
};


const getUserEnrolledCourses = async (userId) => {
  const user = await User.findById(userId).populate({
    path: 'enrolledCourses.courseId',
    select: 'title description price isPublished'
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user.enrolledCourses;
};


const updateProgress = async (userId, courseId, progressData) => {
  try {
  

    const course = await Course.findById(courseId);

    if (!course) {
      throw new Error('Course not found');
    }

    const totalVideos = course.lessons.length;
    const totalQuizzes = course.quizzes.length;

  

    const videosWatched = progressData.lessonsCompleted || 0;
    const quizzesCompleted = progressData.quizzesCompleted || 0;

    const videoProgress = totalVideos > 0 ? (videosWatched / totalVideos) * 100 : 0;
    const quizProgress = totalQuizzes > 0 ? (quizzesCompleted / totalQuizzes) * 100 : 0;

    const totalProgress = (videoProgress + quizProgress) / 2; 
    
    let progress = await Progress.findOneAndUpdate(
      { user: userId, course: courseId },
      {
        course: courseId,
        user: userId,
        totalLessons: totalVideos,
        lessonsCompleted: videosWatched,
        quizzesCompleted: quizzesCompleted,
        percentage: totalProgress,
        lastUpdated: Date.now(),
      },
      { upsert: true, new: true }
    );

    return progress;
  } catch (error) {
    throw new Error(`Failed to update progress: ${error.message}`);
  }
};

const getProgressForCourse = async (userId, courseId) => {
  try {
    const enrollment = await Enrollment.findOne({ user: userId, course: courseId }).populate('progress');
    
   
    
    if (!enrollment) {
      throw new Error('Enrollment not found');
    }

    if (!enrollment.progress) {
      return {
        lessonsCompleted: 0,
        totalLessons: 0,
        percentage: 0,
        message: "No progress yet for this course",
      };
    }

    return enrollment.progress;
  } catch (error) {
    console.error(error.message);
    throw new Error('Failed to fetch progress for course');
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse, 
  deleteCourse,
  getCoursesByCategory,
  enrollInCourse,
  unenrollFromCourse,
  getUserEnrolledCourses,
  updateProgress,
  getProgressForCourse
};
