const express = require("express");
const router = express.Router();

const multer = require("multer");
const FirebaseStorage = require("multer-firebase-storage");

// Firbease Storage Configuration
const storage = FirebaseStorage({
  bucketName: process.env.FIREBASE_BUCKET_NAME,
  credentials: {
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n"),
    projectId: process.env.FIREBASE_PROJECT_ID,
  },
  unique: true,
});

const upload = multer({ storage: storage });

// Importing the required controllers methods
const {
  profilePictureUpload,
} = require("../controllers/file-upload.controller");

// @route => POST /api/v1/file-upload/profile-picture
router.post(
  "/profile-picture",
  upload.single("profilePicture"),
  profilePictureUpload
);

module.exports = router;
