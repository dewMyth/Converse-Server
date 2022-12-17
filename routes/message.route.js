const express = require("express");
const router = express.Router();

const {
  createNewConversation,
  getConversationByTwoUsers,
  getConversationByOneUser,
  createNewMessage,
  getMessagesByConversationId,
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

// @route => POST /api/v1/message/create-new-message
router.post("/create-new-message", createNewMessage);

// @route => POST /api/v1/message/get-messages-by-conversation-id
router.get(
  "/get-messages-by-conversation-id/:conversationId",
  getMessagesByConversationId
);

module.exports = router;
