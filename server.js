const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON data
app.use(cors()); // Allow cross-origin requests

// Health Check Route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Backend is running' });
});

// Import routes
const hiremeRoutes = require('./api/hireme');

// Use routes
app.use('/api', hiremeRoutes);

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process on DB connection failure
    }
};

connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
