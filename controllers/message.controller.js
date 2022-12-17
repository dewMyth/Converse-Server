const Conversation = require("../models/Conversation.model");

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

module.exports = { createNewConversation };
