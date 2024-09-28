// routes/validate.js
require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

router.get('/doctorList', async (req, res) => {
    try {
        let collection = "doctors";

        const documents = await mongoose.connection.db.collection(collection).find({}).toArray();

        if (!documents || documents.length === 0) {
            return res.status(400).json({
                message: "Invalid Doctor"
            });
        }

        const data = documents.reduce((acc, doctor) => {
            acc[doctor.docId] = doctor.name;
            return acc;
        }, {});

        return res.status(200).json(data);

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});


module.exports = router;