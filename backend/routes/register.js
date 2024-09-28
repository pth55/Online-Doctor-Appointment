// routes/validate.js
require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

// Make sure to replace 'collection' with your actual doctors collection name
const collection = 'doctors'; // Example collection name

router.post('/register', async (req, res) => {
    const { firstname, lastname, phone, dob, email, issue, gender, doctorId } = req.body;

    const newAppointment = {
        fname: firstname,
        lname: lastname,
        phone,
        dob,
        email,
        issue,
        gender
    };

    try {
        // Update the doctor's document in the MongoDB collection
        const result = await mongoose.connection.db.collection(collection).updateOne(
            { docId: doctorId }, // Filter to find the doctor by ID
            { $push: { appointments: newAppointment } } // Push the new appointment into the appointments array
        );

        if (result.modifiedCount > 0) {
            // Appointment successfully added
            return res.status(200).json({ message: 'Registration successful' });
        } else {
            // Doctor not found or no modifications made
            return res.status(404).json({ message: 'Doctor not found or no changes made' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;
