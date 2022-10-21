const getAllTasks = (req, res) => {
  res.send("all tasks");
};

const getTask = (req, res) => {
  res.send("a task");
};
const updateTask = (req, res) => {
  res.send("update task");
};

const deleteTask = (req, res) => {
  res.send("del task");
};

const createTask = (req, res) => {
  res.send("create a task");
};

module.exports = { getAllTasks, getTask, updateTask, deleteTask, createTask };
