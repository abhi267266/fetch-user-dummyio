const mongoose = require('mongoose');

// Define the MongoDB connection URL (use your own database name)
const dbURL = 'mongodb://localhost:27017/part-a' || process.env.DB_URL;

// Connect to MongoDB
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Event handlers for the MongoDB connection
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB successfully!');
});

// Optionally, you can export the `db` object for use in other parts of your application
module.exports = db;
