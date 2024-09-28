// routes/validate.js
require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

router.delete('/deletePatient', async (req, res) => {
    const { doctorId, email } = req.body;
    const collection = 'doctors';

    try {
        const result = await mongoose.connection.db.collection(collection).updateOne(
            { docId: doctorId }, // Filter to find the doctor by docId
            { $pull: { appointments: { email: email } } } // Pull will delete record from the appointments array
        );

        if (result.modifiedCount > 0) { {/* if atleat one record updated*/}
            return res.status(200).json({ message: 'Appointment successfully deleted' });
        } else {
            return res.status(404).json({ message: 'Doctor not found or no changes made' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;
