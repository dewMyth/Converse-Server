const express = require("express");
const router = express.Router();

// Importing the required controllers methods
const { createUser } = require("../controllers/user.controller");

// @route => POST /api/v1/user/create
router.post("/create", createUser);

module.exports = router;
