
const mongoose = require("mongoose");
const Account = require("../models/Account");

const transferFunds = async (req, res) => {
    const { toUserId, amountPaise } = req.body || {};

    if (!req.userId || !mongoose.isValidObjectId(req.userId)) {
        return res.status(401).json({ message: "Authentication required" });
    }

    if (!mongoose.isValidObjectId(toUserId)) {
        return res.status(400).json({ message: "Invalid recipient" });
    }

    if (!Number.isSafeInteger(amountPaise) || amountPaise <= 0) {
        return res.status(400).json({ message: "Amount must be a positive integer in paise" });
    }

    if (req.userId.toString() === toUserId.toString()) {
        return res.status(400).json({ message: "Cannot transfer to yourself" });
    }

    let session;

    try {
        session = await mongoose.startSession();
        await session.withTransaction(
            async () => {

                const sender = await Account.findOneAndUpdate(
                    {
                        ownerId: req.userId,
                        isActive: true,
                        balancePaise: { $gte: amountPaise }
                    },
                    {
                        $inc: {
                            balancePaise: -amountPaise
                        }
                    },
                    {
                        new: true,
                        session,
                        runValidators: true
                    }
                );

                if (!sender) {
                    throw new Error(
                        "SENDER_UNAVAILABLE_OR_INSUFFICIENT_BALANCE"
                    );
                }

                const receiver = await Account.findOneAndUpdate(
                    { ownerId: toUserId, isActive: true },
                    {
                        $inc: {
                            balancePaise: amountPaise
                        }
                    },
                    {
                        new: true,
                        session,
                        runValidators: true
                    }
                );

                if (!receiver) {
                    throw new Error("RECEIVER_NOT_FOUND");
                }
            },
            {
                readPreference: "primary",
                readConcern: { level: "snapshot" },
                writeConcern: { w: "majority" }
            }
        );

        return res.status(200).json({ success: true, message: "Money transferred successfully" });

    } catch (error) {
        console.error("Transfer failed:", error.message);

        if (
            error.message ===
            "SENDER_UNAVAILABLE_OR_INSUFFICIENT_BALANCE"
        ) {
            return res.status(400).json({
                message: "Sender unavailable or insufficient balance"
            });
        }

        if (error.message === "RECEIVER_NOT_FOUND") {
            return res.status(404).json({
                message: "Receiver account not found or inactive"
            });
        }

        return res.status(500).json({ message: "Transfer failed. No transfer was committed." });

    } finally {
        if (session) await session.endSession();
    }
};

module.exports = transferFunds;
