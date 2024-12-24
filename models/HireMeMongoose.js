const mongoose = require('mongoose');

const hiremeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Removes leading/trailing whitespace
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Simple regex for email validation
    },
    role: {
        type: String,
        required: true,
    },
    number: {
        type: String, // Changed to String for flexibility
        required: false, // Optional
    },
    company_name: {
        type: String,
        required: false, // Optional
    },
    message: {
        type: String,
        required: true,
        maxlength: 1000, // Maximum length of 1000 characters
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});

module.exports = mongoose.model('HireMeMongoose', hiremeSchema);
