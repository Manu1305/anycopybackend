// models/advertisement.js

const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        require: false
    }
});

module.exports = mongoose.model('Template', templateSchema);
