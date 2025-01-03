const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS middleware
const db = require('./config/db');
const courseRoutes = require('./routes/courseRoutes');

// Initialize environment variables
dotenv.config();

// Create an Express app
const app = express();

// Enable CORS for all requests
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Test database connection
db.connect()
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Database connection failed:', err.message));

// Use course routes
app.use('/courses', courseRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
