const mongoose = require('mongoose');

const hiremeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email validation
        },
        role: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: false,
        },
        company_name: {
            type: String,
            required: false,
        },
        message: {
            type: String,
            required: true,
            maxlength: 1000,
        },
    },
    {
        timestamps: true, // Adds `createdAt` and `updatedAt`
    }
);

module.exports = mongoose.model('HireMe', hiremeSchema);
