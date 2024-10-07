const { string } = require('joi');
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: [String],
  image:{
    type:String,
    required:false
  },
  lessons: [
    {
      title: String,
      content: String,
      completedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'student' }],
    },
  ],
  quizzes: [
    {
      title: String,
      questions: [
        {
          question: String,
          options: [String],
          correctAnswer: String,
        },
      ],
      completedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'student' }],
    },
  ],
  learningMaterials: [
    {
      type: {
        type: String,
        enum: ['video', 'document', 'other'],
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        default: '',
      },
      duration: {
        type: Number,
      },
    },
  ],
  duration: {
    type: Number,
  },
  price: {
    type: Number,
    default: 0,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  publishedAt: {
    type: Date,
  },
});

module.exports = mongoose.model('Course', CourseSchema);
