const express = require("express");
const router = express.Router();

// Importing the required controllers methods
const {
  createUser,
  findMyUsers,
  findUserById,
} = require("../controllers/user.controller");

// @route => POST /api/v1/user/create
router.post("/create", createUser);

// @route => POST /api/v1/user/find-my-users
router.post("/find-my-users", findMyUsers);

// @route => GET /api/v1/user/:userId
router.get("/find-user-by-id/:userId", findUserById);

module.exports = router;
