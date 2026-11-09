const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authmiddlewares");
const transferFunds = require("../controllers/account");


router.post("/transfer", authMiddleware, transferFunds);

module.exports = router;