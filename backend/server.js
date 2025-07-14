// backend/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
//const errorHandler = require('./middleware/error');

// Load env vars
require('dotenv').config();

// Connect to database
connectDB();

// Initialize express
const app = express();

// Middleware
// backend/server.js

const corsOptions = {
    origin: "http://localhost:5173",
    methods : "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials :true
};


app.use(cors(corsOptions));
app.use(express.json());

// Route files
const users = require('./routes/userRoutes');
const history = require('./routes/historyRoutes');


// Mount routers
app.use('/api/users', users);
app.use('/api/history', history);

// Error handler middleware
//app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running  on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  
  server.close(() => process.exit(1));
});