const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    profilePciture: {
      type: String,
    },
    isVerified: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);
