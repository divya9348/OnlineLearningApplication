const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Message: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Contact', ContactSchema);
