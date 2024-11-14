// routes/validate.js
require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

router.post('/appointment', async (req, res) => {
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
    const collection = 'doctors';
    
    try {
        // Check if the patient is already registered for the selected doctor by matching phone or email
        const doctor = await mongoose.connection.db.collection(collection).findOne({
            docId: doctorId,
            $or: [
                { 'appointments.email': email },
                { 'appointments.phone': phone }
            ]
        });

        if (doctor) {
            // If the patient is already registered, return an error
            return res.status(400).json({ message: 'You have already made an appointment with this doctor' });
        }

        // If not, proceed with updating the doctor's appointments list
        const result = await mongoose.connection.db.collection(collection).updateOne(
            { docId: doctorId }, // Filter to find the doctor by ID
            { $push: { appointments: newAppointment } } // Push the new appointment into the appointments array
        );

        if (result.modifiedCount > 0) {
            // Appointment successfully added
            return res.status(200).json({ message: 'Appointment successful' });
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
