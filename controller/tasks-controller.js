const { Task } = require("../models/task");

const getTasksByUserId = async (req, res) => {
  const id = req.user._id;
  const tasks = await Task.find({ userId: id });
  return res.status(200).json(tasks);
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) throw new Error(`No task found with ${id} id!`);
    return res.status(200).json(task);
  } catch (err) {
    console.log(err.message)
  }
};

const addingTask = async (req, res) => {
  const {email,jobTitle,task,completed} = req.body;
  const createTask = new  Task({
    email,
    task,
    jobTitle,
    completed,
    userId: req.user._id,
  });
  await createTask.save();
  return res.status(200).json(createTask);
};

const deletingAllTaskByUserId = async (req, res) => {
  const id = req.user._id;
  await Task.deleteMany({userId:id});
  return res.status(200).send(`All task Deleted Sucessfully for user ${req.user.firstName} ${req.user.lastName}`);
};

const deletingTaskById = async (req, res) => {
  const { id } = req.params;
  await Task.deleteOne({ _id: id });
  return res.send("Data Deleted");
};

const updatingTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    let task = await Task.findById(id);
    if (!task) {
      throw new Error("no name exist!");
    }
    const body = req.body;
    console.log(req.body);
    for (a in body) {
      task[a] = body[a];
    }
    await task.save();
    return res.send("task Updated sucessfully");
  } catch (err) {
    console.log(err);
    res.status(401).send(err.message);
  }
};

module.exports = {
  getTaskById,
  getTasksByUserId,
  updatingTaskById,
  deletingTaskById,
  deletingAllTaskByUserId,
  addingTask,
};
