const User = require("../models/user.model");

const validator = require("validator");
const jwt = require("jsonwebtoken");

// Create and Generate Access Token
// @route => POST /api/v1/user/create

const createUser = async (req, res) => {
  const { username, mobileNo } = req.body;

  if (!username || !mobileNo) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  if (!validator.isMobilePhone(mobileNo)) {
    return res
      .status(422)
      .json({ error: "Please enter a valid mobile number" });
  }

  const isUserExist = await User.findOne({ mobileNo: mobileNo });

  if (isUserExist) {
    return res.status(422).json({ error: "User already exists" });
  } else {
    const newUser = new User({
      username: username,
      mobileNo: mobileNo,
    });

    await newUser.save();
    try {
      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
      res.status(201).json({
        message: "User created successfully",
        user: {
          token: token,
          _id: newUser._id,
          username: newUser.username,
          mobileNo: newUser.mobileNo,
        },
      });
    } catch (err) {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
};

module.exports = { createUser };
