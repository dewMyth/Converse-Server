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

const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

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

// Socket Configuration

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("A new user connected with id : " + socket.id);

  socket.on("addUser", (userId) => {
    console.log("userId => ", userId);
    console.log("socket.id => ", socket.id);
    addUser(userId, socket.id);
    // Send the users array to the client
    io.emit("getUsers", users);
  });

  // Get the message from the client and Send to specific user/receiver
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log("recieverId => ", receiverId);
    console.log("senderId => ", senderId);
    console.log("text => ", text);
    const user = getUser(receiverId); // Get the receiver
    // Send a message to a specific User -> socket.to("socketId").emit()
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    } else {
      console.log("User not online!");
    }
  });

  // Disconnect socket server after user disconnects (moved away from conversation)
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

// Listen on port 5000
server.listen(process.env.PORT || 5000, () => {
  console.log("Converse Server Started on PORT : " + process.env.PORT);
});
