const express = require("express");
const router = express.Router();

const { createNewConversation } = require("../controllers/message.controller");

// @route => POST /api/v1/message/create-new-conversation
router.post("/create-new-conversation", createNewConversation);

module.exports = router;
