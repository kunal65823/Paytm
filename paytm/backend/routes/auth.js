const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post("/Signup", async (req,res)=>{
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User created successfully",
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});


//singin

router.post("Signin", async (req,res) => {
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email}).select('+password');

        if(!user){
            return res.status(400).json({
                message:"Invalid username or password"
            })
        }
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                message:"Invalid username or password"
            })
        }
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
         res.json({
            message: "Login successful",
            token
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});