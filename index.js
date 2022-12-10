//Importing the required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Use CORS to allow requests from any origin
app.use(cors());

// Parse incoming requests as JSON
app.use(express.json());

// Importing the required routes
const userRoute = require("./routes/user.route");
const fileUploadRoute = require("./routes/file-upload.route");

// Use the imported routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/file-upload", fileUploadRoute);

// Connect to your MongoDB database
mongoose
  .set("strictQuery", true)
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(err);
  });

// Listen on port 5000
app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});
