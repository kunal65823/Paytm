
const mongoose = require("mongoose");
const Account = require("../../models/Account");

const transferFunds = async (req, res) => {
    const { toAccountId, amountPaise } = req.body;

    // 1. Validate authenticated user
    if (!req.userId || !mongoose.isValidObjectId(req.userId)) {
        return res.status(401).json({
            message: "Authentication required"
        });
    }

    // 2. Validate receiver ID
    if (!mongoose.isValidObjectId(toAccountId)) {
        return res.status(400).json({
            message: "Invalid receiver account ID"
        });
    }

    // 3. Validate amount
    if (
        !Number.isSafeInteger(amountPaise) ||
        amountPaise <= 0
    ) {
        return res.status(400).json({
            message: "Amount must be a positive integer in paise"
        });
    }

    const fromAccountId = req.body.fromAccountId;

    if (!mongoose.isValidObjectId(fromAccountId)) {
        return res.status(400).json({
            message: "Invalid sender account ID"
        });
    }

    // 4. Prevent same-account transfers
    if (
        fromAccountId.toString() === toAccountId.toString()
    ) {
        return res.status(400).json({
            message: "Cannot transfer to the same account"
        });
    }

    const session = await mongoose.startSession();

    try {
        await session.withTransaction(
            async () => {

                // 5. Deduct money only from the
                // authenticated user's own account.
                // Also check available balance atomically.

                const sender = await Account.findOneAndUpdate(
                    {
                        _id: fromAccountId,
                        ownerId: req.userId,
                        isActive: true,
                        balancePaise: {
                            $gte: amountPaise
                        }
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

                // 6. Credit the receiver account.

                const receiver = await Account.findOneAndUpdate(
                    {
                        _id: toAccountId,
                        isActive: true
                    },
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

        return res.status(200).json({
            success: true,
            message: "Money transferred successfully"
        });

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

        return res.status(500).json({
            message: "Transfer failed. No transfer was committed."
        });

    } finally {
        await session.endSession();
    }
};

module.exports = transferFunds;
