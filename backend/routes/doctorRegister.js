require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    edu: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // New email field
    password: { type: String, required: true },
    appointments: { type: Array, default: [] },
    docId: { type: String, required: true },
}, {
    toJSON: { virtuals: true, versionKey: false }, // Exclude __v from JSON output
    toObject: { virtuals: true, versionKey: false } // Exclude __v from Object output
});

const Doctor = mongoose.model('Doctor', doctorSchema);

router.post('/doctorRegister', async (req, res) => {
    const { fullName, education, phone, password, email} = req.body;

    // Ensure no extra spaces in the full name and add 'Dr.' prefix
    const doctorName = `Dr. ${fullName.trim()}`;

    // Fetch the count of existing doctors to generate the new docId
    try {
        const doctorCount = await mongoose.connection.db.collection('doctors').countDocuments();
        const docId = `doc${doctorCount + 1}`;

        // Prepare the new doctor object
        const newDoctor = new Doctor({
            name: doctorName,
            edu: education,
            phone: phone,
            password: password,
            appointments: [], // Empty array for appointments
            docId: docId,
            email
        });

        // Save the new doctor to the database
        const result = await newDoctor.save();

        if (result && result._id) {
            return res.status(200).json({ message: 'Doctor Registration successful' });
        } else {
            return res.status(500).json({ message: 'Failed to register doctor' });
        }
    } catch (err) {
        console.error('Error registering doctor:', err);
        return res.status(500).json({ message: 'An error occurred during registration' });
    }
});

module.exports = router;
