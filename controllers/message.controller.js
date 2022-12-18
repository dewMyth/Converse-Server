const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

const createNewConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const conversation = new Conversation({
      members: [senderId, receiverId],
    });

    if (!conversation.members) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (conversation.members.length !== 2) {
      return res
        .status(400)
        .json({ message: "Conversation must have two members" });
    }

    if (conversation.members[0] === conversation.members[1]) {
      return res
        .status(400)
        .json({ message: "Conversation must have two different members" });
    }

    // Check whether the conversation already exists
    const exist = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (exist) {
      //If the conversation already exists, return the conversation
      res.status(200).json(exist);
    } else {
      //If the conversation does not exist, create a new conversation
      const savedConversation = await conversation.save();
      res.status(200).json(savedConversation);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getConversationByTwoUsers = async (req, res) => {
  try {
    const { firstUserId, secondUserId } = req.params;
    const conversation = await Conversation.findOne({
      members: { $all: [firstUserId, secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getConversationByOneUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const conversation = await Conversation.find({
      members: { $in: [userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createNewMessage = async (req, res) => {
  try {
    const { senderId, conversationId, text } = req.body;
    const newMessage = new Message({
      conversationId,
      senderId,
      text,
    });

    if (
      !newMessage.senderId ||
      !newMessage.conversationId ||
      !newMessage.text
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMessagesByConversationId = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createNewConversation,
  getConversationByTwoUsers,
  getConversationByOneUser,
  createNewMessage,
  getMessagesByConversationId,
};
