const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
  progress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Progress',
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
