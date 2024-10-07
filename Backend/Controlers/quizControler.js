const quizService = require('../Services/quizesService');
const responseHelper = require('../Helpers/responseHelper');

const createQuiz = async (req, res) => {
  try {
    const quizData = req.body;

    await quizService.createQuiz(quizData);
    responseHelper.successResponse(res, 'Quiz created successfully');
  } catch (error) {
    console.error(error.message);
    responseHelper.errorResponse(res, 'Server error');
  }
};


const submitQuiz = async (req, res) => {
  try {
   
    const { quizId } = req.params;
    const { answers } = req.body;
    const userId = req.user.user._id; 

   

    const result = await quizService.submitQuiz(quizId, answers, userId);

    responseHelper.successResponse(res, "Quiz submitted successfully", result);
  } catch (error) {
    console.error(error.message);
    responseHelper.errorResponse(res, "Server error");
  }
};


const getQuizResults = async (req, res) => {
  try {
    const { quizId } = req.params;

    const result = await quizService.getQuizResults(quizId);

    responseHelper.successResponse(res, "Quiz results fetched successfully", result);
  } catch (error) {
    console.error(error.message);
    responseHelper.errorResponse(res, "Server error");
  }
};


module.exports = {
    createQuiz,
    submitQuiz,
    getQuizResults
}