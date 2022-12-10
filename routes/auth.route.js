const express = require("express");
const router = express.Router();

// Importing the required controllers methods
const { sendOTP, verifyOTP } = require("../controllers/auth.controller");

// @route => POST /api/v1/auth/send-otp
router.post("/send-otp", sendOTP);

// @route => POST /api/v1/auth/verify-otp
router.post("/verify-otp", verifyOTP);

module.exports = router;
