// routes/validate.js
require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

router.post('/validate', async (req, res) => {
    const { email, pass } = req.body; // Change to body
    try {
        let collection = "doctors";
        // this will return everything. Incl. PASSWORDS
        const documents = await mongoose.connection.db.collection(collection).find({ email: email, password: pass }).toArray();

        if (!documents || documents.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid Doctor"
            });
        }

        return res.status(200).json({
            success: true,
            message: "valid doctor",
            // this will return everything. Incl. PASSWORDS
            data: documents
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});


module.exports = router;