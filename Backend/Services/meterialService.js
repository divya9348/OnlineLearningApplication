const Course = require('../Models/course');

const uploadLearningMaterial = async (materialData) => {
  try {
    const { courseId, type, url, title, description } = materialData;

    const course = await Course.findById(courseId);

    if (!course) {
      throw new Error('Course not found');
    }

    course.learningMaterials.push({
      type,
      url,
      title,
      description,
    });

    await course.save();

    return { message: 'Learning material uploaded successfully' };
  } catch (error) {
    throw new Error(`Failed to upload learning material: ${error.message}`);
  }
};


const deleteLearningMaterial = async (materialId) => {
  try {
    const course = await Course.findOne({ 'learningMaterials._id': materialId });
    if (!course) {
      throw new Error('Course not found');
    }

    course.learningMaterials = course.learningMaterials.filter(material => !material._id.equals(materialId));

    await course.save();

    return { message: 'Learning material deleted successfully' };
  } catch (error) {
    throw new Error(`Failed to delete learning material: ${error.message}`);
  }
};


module.exports = { uploadLearningMaterial, deleteLearningMaterial };
