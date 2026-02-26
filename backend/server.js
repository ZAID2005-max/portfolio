require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows server to accept JSON data

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Database connection error:', err));

// Basic Test Route
app.get('/', (req, res) => {
  res.send('Portfolio Backend is running!');
});

// Start Server
const PORT = process.env.PORT || 5000;
const projectRoutes = require('./routes/ProjectRoutes');
app.use('/api/projects', projectRoutes);
app.use('/api/contact', require('./routes/contactRoutes'));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});