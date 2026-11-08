const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const transferFunds = require("../controllers/transferController");


router.post("/transfer", authMiddleware, transferFunds);

module.exports = router;