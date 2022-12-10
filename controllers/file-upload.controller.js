// Upload a image file for the profile picture
const profilePictureUpload = async (req, res) => {
  try {
    const profilePictureName = req.file.path;
    return res.status(200).json({
      profilePictureName,
      message: "Image uploaded successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { profilePictureUpload };
