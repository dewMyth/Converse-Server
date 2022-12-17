const Conversation = require("../models/Conversation.model");
const Message = require("../models/Message.model");

const createNewConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const conversation = new Conversation({
      members: [senderId, receiverId],
    });

    const savedConversation = await conversation.save();
    res.status(200).json(savedConversation);
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
