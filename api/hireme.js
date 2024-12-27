const Hireme = require('../models/HireMeMongoose');

// Connect to MongoDB (only if not connected)
const connectDB = async () => {
    if (mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        } catch (error) {
            console.error('MongoDB connection error:', error);
            throw new Error('Database connection failed');
        }
    }
};

// API Handler
const handler = async (req, res) => {
    await connectDB();

    try {
        if (req.method === 'POST') {
            const { name, email, role, message, company_name, number } = req.body;

            // Validate required fields
            if (!name || !email || !role || !message) {
                return res.status(400).json({
                    error: 'All fields (name, email, role, message) are required.',
                });
            }

            const newHireme = new Hireme({ name, email, role, message, company_name, number });
            await newHireme.save();

            return res.status(201).json({ message: 'Hire Me form submitted successfully!' });
        } else if (req.method === 'GET') {
            const hiremeData = await Hireme.find();
            return res.status(200).json(hiremeData);
        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
};

module.exports = handler;
