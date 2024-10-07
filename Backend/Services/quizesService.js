const Course = require('../Models/course'); 
const User = require('../Models/studentDataSchema');

const createQuiz = async (quizData) => {
  try {
    
    const { courseId, title, questions } = quizData.quizData;
   
    const course = await Course.findById(courseId);

    if (!course) {
      throw new Error('Course not found');
    }             

    course.quizzes.push({
      title,
      questions,
      completedBy: [],
    });

    await course.save();

    return { message: 'Quiz created successfully' };
  } catch (error) {
    throw new Error(`Failed to create quiz: ${error.message}`);
  }
};


const submitQuiz = async (quizId, answers, userId) => {
  try {
    const course = await Course.findOne({ "quizzes._id": quizId });
console.log("course:",course)
    if (!course) {
      throw new Error("Quiz not found");
    }

    const quizToUpdate = course.quizzes.find((quiz) => quiz._id.equals(quizId));

    if (!quizToUpdate) {
      throw new Error("Quiz not found");
    }

    if (!quizToUpdate.completedBy.includes(userId)) {
      quizToUpdate.completedBy.push(userId);
    }

    let score = 0;
    const userAnswers = [];

    quizToUpdate.questions.forEach((question, index) => {
      const userAnswer = answers[index];
      const correctAnswer = question.correctAnswer;

      userAnswers.push({
        question: question.question,
        userAnswer,
        correctAnswer,
      });

      if (userAnswer === correctAnswer) {
        score++;
      }
    });

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const existingQuizScoreIndex = user.quizScores.findIndex(score => score.courseId.equals(course._id));

    if (existingQuizScoreIndex !== -1) {
      user.quizScores[existingQuizScoreIndex].score = score;
    } else {
      user.quizScores.push({ courseId: course._id, score });
    }

    await user.save();

    await course.save();

    return { message: "Quiz submitted successfully", quiz: quizToUpdate, userAnswers, score };
  } catch (error) {
    throw new Error(`Failed to submit quiz: ${error.message}`);
  }
};


const getQuizResults = async (quizId) => {
  try {
    const course = await Course.findOne({ "quizzes._id": quizId });

    if (!course) {
      throw new Error("Quiz not found");
    }

    const quiz = course.quizzes.find(q => q._id.equals(quizId));
    if (!quiz) {
      throw new Error("Quiz not found");
    }

    const completedUsers = await User.find({
      "quizScores.courseId": course._id
    });

    const results = completedUsers.map(user => {
      const userScore = user.quizScores.find(score => score.courseId.equals(course._id));
      
      console.log(`User ${user.name}'s score for quiz ${quiz.title}:`, userScore);

      return {
        userId: user._id,
        userName: user.name,
        score: userScore ? userScore.score : 0
      };
    });

    return {
      quiz,
      results,
    };
  } catch (error) {
    throw new Error(`Failed to fetch quiz results: ${error.message}`);
  }
};


module.exports = { createQuiz, submitQuiz, getQuizResults };
