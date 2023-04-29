const Task = require("../modules/task");
const { validationResult } = require("express-validator");

exports.newTask = (req, res) => {
  const data = req.body;
  const userId = req.user._doc._id;
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Invalid data", errors });
  }
  const taks = new Task({
    ...data,
    userId,
  });
  taks
    .save()
    .then((result) => {
      return res.status(201).json({ message: "Task created" });
    })
    .catch((err) => {
      return res.status(400).json({ message: "Something goes wrong" });
    });
};

exports.getAllAdminTasks = (req, res) => {
  const {userId} = req.params;
  const task = Task.find({userId});
  task
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(400).json({ message: "Tasks not found" });
    });
};

exports.getUserTasks = (req, res) => {
  const {assignedUserId} = req.params;
  const task = Task.find({assignedUserId});
  task
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(400).json({ message: "Tasks not found" });
    });
};
exports.deleteTask = async (req, res) => {
  const id = req.headers.id;
  Task.deleteOne({ _id: id })
    .then((deletedPost) => {
      res.status(200).json({ message: "Task deleted successfully" });
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed to delete post" });
    });
};
