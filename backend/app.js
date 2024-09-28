// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const validateRoutes = require('./routes/validate');
const doctorListRoutes = require('./routes/doctorList');
const registerRoutes = require('./routes/register');
const deletePatientRoutes = require('./routes/deletePatient');

const { connectDB } = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3043;

connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; font-src 'self' http://localhost:3043; script-src 'self'; style-src 'self';");
    next();
});

// Routes
app.use('/api', validateRoutes);
app.use('/api', doctorListRoutes);
app.use('/api', registerRoutes);
app.use('/api', deletePatientRoutes);

app.listen(PORT, () => {
    console.log(`Server running on PORT http://localhost:${PORT}/`);
});
