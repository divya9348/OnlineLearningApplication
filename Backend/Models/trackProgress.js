const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student',
    required: true,
  },
  lessonsCompleted: {
    type: Number,
    default: 0,
  },
  totalLessons: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Progress', ProgressSchema);
