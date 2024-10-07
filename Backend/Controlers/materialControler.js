const learningService = require('../Services/meterialService');
const responseHelper = require('../Helpers/responseHelper');


const uploadLearningMaterial = async (req, res) => {
  try {
    const { type, url, title, description } = req.body;
    const courseId = req.params.courseId;

    const materialData = {
      courseId,
      type,
      url,
      title,
      description,
    };

    await learningService.uploadLearningMaterial(materialData);
    responseHelper.successResponse(res, 'Learning material uploaded successfully');
  } catch (error) {
    console.error(error.message);
    responseHelper.errorResponse(res, 'Server error');
  }
};

const deleteLearningMaterial = async (req, res) => {
  try {
    const { id } = req.params;

    await learningService.deleteLearningMaterial(id);
    responseHelper.successResponse(res, 'Learning material deleted successfully');
  } catch (error) {
    console.error(error.message);
    responseHelper.errorResponse(res, 'Server error');
  }
};


  module.exports = {
    uploadLearningMaterial,
    deleteLearningMaterial
  }