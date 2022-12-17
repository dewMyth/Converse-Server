const express = require("express");
const router = express.Router();

const {
  createNewConversation,
  getConversationByTwoUsers,
  getConversationByOneUser,
} = require("../controllers/message.controller");

// @route => POST /api/v1/message/create-new-conversation
router.post("/create-new-conversation", createNewConversation);

// @route => POST /api/v1/message/get-conversation-by-two-users
router.get(
  "/get-conversation-by-two-users/:firstUserId/:secondUserId",
  getConversationByTwoUsers
);

// @route => POST /api/v1/message/get-conversation-by-one-user
router.get("/get-conversation-by-one-user/:userId", getConversationByOneUser);

module.exports = router;
