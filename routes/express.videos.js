const express = require('express');
const router = express.Router();
const Video = require('../models/videos-model');

router.route('/')
    .get(async (req, res) => {
        try {
            await Video.find({})
                .then((response) => res.json({ success: true, videos: response }))
                .catch(err => res.status(404).json({ success: false, message: "failed to fetch videos", error: err }))
        } catch (err) {
            console.log("Error: ", err);
            res.status(500).json({ success: false, message: "failed to fetch videos" })
        }
    })

module.exports = router;