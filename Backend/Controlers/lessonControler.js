const lessonService = require('../Services/lessonService');
const responseHelper = require('../Helpers/responseHelper');

const createLesson = async (req, res) => {
  const { courseId } = req.params;
  const { title, content } = req.body;

  try {
    const newLesson = await lessonService.createLesson(courseId, title, content);

    res.status(201).json({ message: 'Lesson created successfully', lesson: newLesson });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Failed to create lesson', error: error.message });
  }
};


const getLessonsByCourse = async (req, res) => {
  try {
    const lessons = await lessonService.getLessonsByCourse(req.params.courseId);
    responseHelper.successResponse(res, 'Lessons retrieved successfully', lessons);
  } catch (error) {
    console.error(error.message);
    responseHelper.errorResponse(res, 'Server error');
  }
};

const updateLesson = async (req, res) => {
  try {
    const { title, content } = req.body;
    const lesson = await lessonService.updateLesson(req.params.id, title, content);
  
    responseHelper.successResponse(res, 'Lesson updated successfully', lesson);
  } catch (error) {
    console.error(error.message);
    responseHelper.errorResponse(res, 'Server error');
  }
};

const deleteLesson = async (req, res) => {
  try {
    await lessonService.deleteLesson(req.params.id);
    responseHelper.successResponse(res, 'Lesson removed successfully');
  } catch (error) {
    console.error(error.message);
    responseHelper.errorResponse(res, 'Server error');
  }
};



module.exports = {
  createLesson,
  getLessonsByCourse,
  updateLesson,
  deleteLesson
}
