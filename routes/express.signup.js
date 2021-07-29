const express = require('express');
const router = express.Router();
const User = require('../models/user-model');

router.route('/')
    .post(async (req, res) => {
        try {
            const { username, password, email } = req.body.data;
            const checkUser = await User.findOne({ username })
            if (checkUser) {
                return res.status(409).json({ success: false, message: "account already exists with same username" })
            }
            const newUser = new User({
                username,
                password,
                email
            });
            await newUser.save()
            res.status(201).json({ success: true, message: "successfully created new account" })
        } catch (error) {
            res.status(500).json({ success: false, message: "failed to create account" })
        }
    })


module.exports = router;