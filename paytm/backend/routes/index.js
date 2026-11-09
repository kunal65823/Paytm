const express = require("express");

const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/user", require("./User"));
router.use("/account", require("./account"));

module.exports = router;