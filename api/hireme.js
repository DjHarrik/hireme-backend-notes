const mongoose = require('mongoose');
const Hireme = require('../models/HireMeMongoose');

// Database connection (move to a helper file for better modularity if needed)
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw new Error('Database connection failed');
    }
  }
};

// API Handler
const handler = async (req, res) => {
  await connectDB(); // Ensure database connection for each request

  if (req.method === 'POST') {
    const { name, email, role, message, company_name, number } = req.body;

    // Validate required fields
    if (!name || !email || !role || !message) {
      return res.status(400).json({
        error: 'All fields (name, email, role, message) are required.',
      });
    }

    try {
      const newHireme = new Hireme({
        name,
        email,
        role,
        message,
        company_name,
        number,
      });

      await newHireme.save();

      return res.status(201).json({ message: 'Hire Me form submitted successfully!' });
    } catch (error) {
      console.error('Error submitting form:', error);
      return res.status(500).json({ error: 'An error occurred while submitting the form.' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};

module.exports = handler;
