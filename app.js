require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const bodyParser = require("body-parser");
const { signUp, signIn, getUser } = require("./controllers/AuthController");
const { newTask, deleteTask, getAllAdminTasks, getUserTasks } = require("./controllers/TaskController");
const { authMiddleware } = require("./middleware/AuthMiddleware");
const { checkUserRoleAdmin } = require("./middleware/AdminMiddleware");
const DB = process.env.DB;
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log(error));

app.post("/sign-up-user",authMiddleware,checkUserRoleAdmin, signUp);
app.post("/sign-in", signIn);
app.get("/users", signIn);
app.get("/me",authMiddleware, getUser);

app.post("/add-task", authMiddleware, newTask);
app.delete("delete-task",authMiddleware, deleteTask);
app.get("/tasks/admin/:userId",authMiddleware, getAllAdminTasks);
app.get("/tasks/user/:assignedUserId",authMiddleware, getUserTasks);




server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`${PORT} Server started`);
});
