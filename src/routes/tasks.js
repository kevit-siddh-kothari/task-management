const express = require("express");
const {
  getTaskById,
  getTasksByUserId,
  updatingTaskById,
  deletingTaskById,
  deletingAllTaskByUserId,
  addingTask,
} = require("../controller/tasks-controller");

//we can make just routes routes
const taskRouters = express.Router();

// * Post Request
taskRouters.post("/", addingTask);

// * Get Request
taskRouters.get("/", getTasksByUserId);
taskRouters.get("/:id", getTaskById);

// * Delete Request
taskRouters.delete("/", deletingAllTaskByUserId);
taskRouters.delete("/:id", deletingTaskById);

// * Patch Request
taskRouters.patch("/:id", updatingTaskById);

module.exports = {
  taskRouters,
};
