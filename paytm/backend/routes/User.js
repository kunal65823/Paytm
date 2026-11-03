
const express = require("express");
const bcrypt = require("bcryptjs");

const userRouter = express.Router();

const User = require("../../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// ==================================
// 1. UPDATE USER INFORMATION
// ==================================

userRouter.put("/", authMiddleware, async (req, res) => {
    try {
        const { firstName, lastName, password } = req.body;

        const updateData = {};

        if (firstName !== undefined) {
            updateData.firstName = firstName;
        }

        if (lastName !== undefined) {
            updateData.lastName = lastName;
        }

        if (password !== undefined) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: "Please provide information to update"
            });
        }

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        Object.assign(user, updateData);

        await user.save();

        res.status(200).json({
            message: "User updated successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});


// ==================================
// 2. GET USERS - SEARCH BY NAME
// ==================================

userRouter.get("/bulk", authMiddleware, async (req, res) => {
    try {
        const filter = (req.query.filter || "").trim();

        if (!filter) {
            return res.status(400).json({
                message: "Please provide a search filter"
            });
        }

        const users = await User.find({
            $or: [
                {
                    firstName: {
                        $regex: filter,
                        $options: "i"
                    }
                },
                {
                    lastName: {
                        $regex: filter,
                        $options: "i"
                    }
                }
            ]
        })
        .select("firstName lastName")
        .limit(20);

        res.status(200).json({
            users: users.map(user => ({
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});


module.exports = userRouter;
