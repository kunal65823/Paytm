const express = require("express");
const bcrypt = require("bcryptjs");

const userRouter = express.Router();

const User = require("../../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const jwt = require("jsonwebtoken");

userRouter.put("/" ,authMiddleware, async (req, res) => {
    try{
        const{ firstName, lastName, password } = req.body;

        const updateData =[]

        if(firstName !== undefined){
            updateData.firstName = firstName;
        }

         if(lastName !== undefined){
            updateData.lastName = lastName;
        }
         if(password !== undefined){
            updateData.password = password;
        }

         if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: "Please provide information to update"
            });
        }

        const user = await User.findById(req.body)
        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }

        Object.assign(user,updateData);

        await user.save();

        res.status(200).json({
            message: "User updated successfully",
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = userRouter;