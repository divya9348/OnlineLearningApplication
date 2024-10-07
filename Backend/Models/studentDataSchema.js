const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    StudentName: {
        type: String,
        // required: true
    },
    Email: {
        type: String,
        // required: true,
        unique: true
        // default: null,
        // index: true,
        // validate: {
        //     validator: validator.isEmail,
        //     message: "{VALUE} is not a valid email!"
        // }
    },
    Password: {
        type: String,
        // required: true,
    },
    socialId: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        enum: ['student', 'instructor', 'admin'],
        default: 'student',
    },
    enrolledCourses: [
        {
            courseId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course',
            },
            progress: {
                type: Number,
                default: 0,
            },
            completed: {
                type: Boolean,
                default: false,
            },
        },
    ],
    createdCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        }
    ],
    quizScores: [
        {
            courseId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course',
                required: true,
            },
            score: {
                type: Number,
                required: true,
            },
        },
    ],
},
    {
        timestamps: true
    });

const studentData = mongoose.model('student', studentSchema);

module.exports = studentData;