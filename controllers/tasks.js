const Task = require("../DB/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send({ tasks });
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).send({ msg: `no task with the id ${req.params.id}` });
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(201).send({ msg: error });
  }
};
const updateTask = async (req, res) => {
  try {
    // const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body);
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      res.status(404).send({ msg: "not found" });
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).send({ msg: `no task wuth id ${req.params.id}` });
    }
    res.status(200).send({ task });
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).send({ task });
  } catch (error) {
    res.status(404).send({ msg: error });
  }
};

module.exports = { getAllTasks, getTask, updateTask, deleteTask, createTask };
