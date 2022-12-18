//Importing the required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Use CORS to allow requests from any origin
app.use(cors());

// Importing the required routes
const userRoute = require("./routes/user.route");
const fileUploadRoute = require("./routes/file-upload.route");
const authRoute = require("./routes/auth.route");
const messageRoute = require("./routes/message.route");

// Use the imported routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/file-upload", fileUploadRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/message", messageRoute);

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
