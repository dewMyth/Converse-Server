const User = require("../models/user.model");

const validator = require("validator");
const jwt = require("jsonwebtoken");

// Create and Generate Access Token
// @route => POST /api/v1/user/create

const createUser = async (req, res) => {
  const { username, mobileNo, profilePicture } = req.body;

  if (!username || !mobileNo) {
    return res.status(422).json({ error: "Please enter a username" });
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
      profilePicture: profilePicture,
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

const findMyUsers = async (req, res) => {
  // Get the array of Contacts from the request body
  const contacts = req.body;

  // Create an empty array to store the phone numbers
  const phoneNumbers = [];

  // Loop through the array of contacts and push the phone numbers to the phoneNumbers array
  if (contacts.length === 0) {
    return res.status(200).json({ myContacts: [] });
  }
  contacts.forEach((contact) => {
    if (contact.phoneNumbers.length === 0) {
      console.log("No phone number found for => " + contact.displayName);
    } else {
      for (let i = 0; i < contact.phoneNumbers.length; i++) {
        let formattedNo = contact.phoneNumbers[i].number.replace(
          /[\s\[\]\(\)-]/g,
          ""
        );
        if (contact.phoneNumbers[i].number[0] === "+") {
          formattedNo = formattedNo.slice(3);
        }
        if (formattedNo[0] === "0") {
          formattedNo = formattedNo.slice(1);
        }
        phoneNumbers.push(contact.phoneNumbers[i].number);
      }
    }
  });

  // Find the users in the database whose mobile number is in the phoneNumbers array
  User.find({ mobileNo: { $in: phoneNumbers } }, (err, users) => {
    if (err) {
      return res.status(500).json({ error: "Something went wrong" });
    } else {
      return res.status(200).json({ myContacts: users });
    }
  });
};

module.exports = { createUser, findMyUsers };
