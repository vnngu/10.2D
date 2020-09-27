const moongose = require("mongoose");
const uuid = require("uuid");

const TaskSchema = moongose.Schema({
  _id: {
    type: String,
    default: uuid.v4,
  },
  taskType: {
    type: String,
    required: true,
  },
  taskTitle: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
    required: true,
  },
  taskExpire: {
    type: String,
    required: true,
  },
  choiceTask: [String],
  decisionTask: String,
  sentenceTask: [String],
  images: [String],
  masterWorkers: {
    type: String,
    required: true,
  },
  reward: {
    type: String,
    required: true,
  },
  nWorkers: {
    type: String,
    required: true,
  },
});

module.exports = moongose.model("tasks", TaskSchema);
