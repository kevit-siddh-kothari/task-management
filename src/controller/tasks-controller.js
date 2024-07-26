const { options } = require("postman-request");
const { Task } = require("../models/task");

// * query parameters 
// * ?limit=10&skip=0?completed=true/false
const getTasksByUserId = async (req, res) => {
 try{
  const { completed, limit, skip, sort } = req.query;
  const obj = {};
  if (sort) {
    const value = sort.split(':');
    obj[value[0]] = Number(value[1]);
  }
  if (completed || limit || skip || sort) {
    if (completed) {
      const task = await Task.find({ userId: req.user._id, completed: completed }, { _id: 0, completed: 1, task: 1, jobTitle: 1 }).limit(Number(limit)).skip(Number(skip)).sort(obj).populate({
        path: 'userId',
      })
      res.send(task)
    } else {
      const task = await Task.find({ userId: req.user._id }, { _id: 0, completed: 1, task: 1, jobTitle: 1 }).limit(Number(limit)).skip(Number(skip)).sort(obj).populate({
        path: 'userId',
      })
      res.send(task);
    }
  }
  else {
    const id = req.user._id;
    const tasks = await Task.find({ userId: id }, { _id: 0 }).populate('userId', 'firstName lastName -_id');
    return res.status(200).json(tasks);
  }
 }catch(err){
   res.send(errs.message)
 }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return new Error(`No task found with ${id} id!`);
    return res.status(200).json(task);
  } catch (err) {
    console.log(err.message);
  }
};

const addingTask = async (req, res) => {
  try {
    const { email, jobTitle, task, completed } = req.body;
    const createTask = new Task({
      email,
      task,
      jobTitle,
      completed,
      userId: req.user._id,
    });
    await createTask.save();
    return res.status(200).json(createTask);
  } catch (err) {
    console.log(err.message)
  }
};

const deletingAllTaskByUserId = async (req, res) => {
  try {
    const id = req.user._id;
    await Task.deleteMany({ userId: id });
    return res.status(200).send(`All task Deleted Sucessfully for user ${req.user.firstName} ${req.user.lastName}`);
  } catch (err) {
    return err.message
  }
};

const deletingTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error()
    }
    await Task.deleteOne({ _id: id });
    return res.send("Data Deleted");
  } catch (err) {
    console.log(err.message)
    res.send(`No task exist with username ${req.user.username}`)
  }
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
