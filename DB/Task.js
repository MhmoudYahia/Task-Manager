const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlenght: [20, "can't be longer than 20"],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports=mongoose.model('Task',TaskSchema);