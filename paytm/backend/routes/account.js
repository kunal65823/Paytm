
const express = require("express");
const router = express.Router();
const Account = require("../models/Account");
const authMiddleware = require("../middlewares/authmiddlewares");
const transferFunds = require("../controllers/account");

router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ ownerId: req.userId, isActive: true });
        if (!account) return res.status(404).json({ message: "Account not found" });
        return res.json({ balancePaise: account.balancePaise });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Unable to load balance" });
    }
});

router.post("/transfer", authMiddleware, transferFunds);

module.exports = router;


