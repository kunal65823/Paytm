const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/Users');
const Account = require('../models/Account');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post("/signup", async (req, res) => {
    let session;
    try {
        const { firstName, lastName, email, password } = req.body || {};
        if (![firstName, lastName, email, password].every(value => typeof value === "string" && value.trim())) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        session = await mongoose.startSession();
        let user;
        await session.withTransaction(async () => {
            [user] = await User.create([{
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: normalizedEmail,
                password: await bcrypt.hash(password, 10)
            }], { session });
            await Account.create([{ ownerId: user._id, balancePaise: 0 }], { session });
        });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        return res.status(201).json({
            message: "User created successfully",
            token,
            user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email }
        });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) return res.status(409).json({ message: "User already exists" });
        return res.status(500).json({ message: "Unable to create account" });
    } finally {
        if (session) await session.endSession();
    }
});

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body || {};
        if (typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password');

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.json({
            message: "Login successful",
            token,
            user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Unable to sign in" });
    }
});

module.exports = router;