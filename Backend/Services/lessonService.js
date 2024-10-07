const Course = require('../Models/course');

const createLesson = async (courseId, title, content) => {
  try {
    
    const course = await Course.findById(courseId);

    if (!course) {
      throw new Error('Course not found');
    }

    const newLesson = {
      title,
      content,
      completedBy: [],
    };
    
    // Add the new lesson to the course
    course.lessons.push(newLesson);

    // Save the updated course with the new lesson
    await course.save();

    // Return the new lesson details
    return newLesson;
  } catch (error) {
    console.error(error.message);
    throw new Error('Failed to create lesson');
  }
};

const getLessonsByCourse = async (courseId) => {
  try {
    const course = await Course.findById(courseId);
   

    if (!course) {
      throw new Error('Course not found');
    }

    const lessons = course.lessons;
   
    return lessons;
  } catch (error) {
    throw new Error(`Failed to retrieve lessons: ${error.message}`);
  }
};


const updateLesson = async (lessonId, title, content) => {
  try {
    const course = await Course.findOne({ 'lessons._id': lessonId });

    if (!course) {
      throw new Error('Course not found');
    }

    const lessonToUpdate = course.lessons.find(lesson => lesson._id.equals(lessonId));

    if (!lessonToUpdate) {
      throw new Error('Lesson not found');
    }

    lessonToUpdate.title = title;
    lessonToUpdate.content = content;

    await course.save();



    return lessonToUpdate;
  } catch (error) {
    console.error(`Failed to update lesson: ${error.message}`);
    throw error;
  }
};




const deleteLesson = async (lessonId) => {
  try {
    const course = await Course.findOne({ 'lessons._id': lessonId });

    if (!course) {
      throw new Error('Course not found');
    }

    course.lessons = course.lessons.filter(lesson => !lesson._id.equals(lessonId));

    await course.save();

    return { message: 'Lesson deleted successfully' };
  } catch (error) {
    throw new Error(`Failed to delete lesson: ${error.message}`);
  }
};

module.exports = { createLesson, getLessonsByCourse, updateLesson, deleteLesson };
