
const express = require("express");

const router = express.Router();

router.get("/balance" , authMiddleware, async (req,res) => {
    const account = await Account.findOne({
        userId : req.userId
    });
    res.json({
        balancePaise : account.balancePaise
    })
})

const authMiddleware = require("../middleware/authMiddleware");
const transferFunds = require("../controllers/transferController");

// Transfer money
router.post("/transfer", authMiddleware, transferFunds);

module.exports = router;


