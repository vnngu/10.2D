const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const Task = require("./models/Task");

// Express app
const app = express();

// Connect to MongoDB
const dbURI =
  "mongodb+srv://vnngu:bVWYE0tcX9kcKYAD@sit313.2hal6.mongodb.net/iCrowdTaskDB?retryWrites=true&w=majority";

// Listen to requests
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => app.listen(PORT))
  .catch((err) => console.log(err));
// Middleware
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, POST, DELETE, OPTIONS, HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Expose-Headers", "Content-Length, X-JSON");
  next();
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET: get all tasks
app.get("/api/task", (req, res) => {
  Task.find({})
    .then((tasks) => res.json({ tasks, status: "success" }))
    .catch((err) => res.json({ tasks: [], status: "error" }));
});
// POST: create a new task
app.post("/api/task", (req, res) => {
  const task = req.body;
  Task.create(task)
    .then((task) => res.json({ task, status: "success" }))
    .catch((err) => res.json({ task: "", status: "error" }));
});

// GET: get by id
app.get("/api/task/:id", (req, res) => {
  const { id } = req.params;
  Task.findById(id)
    .then((task) => res.json({ task, status: "success" }))
    .catch((err) => res.json({ tasks: "", status: "error" }));
});

// DELETE: delete by id
app.delete("/api/task/:id", (req, res) => {
  const { id } = req.params;
  Task.deleteOne({ _id: id })
    .then(() => res.json({ status: "success" }))
    .catch((err) => res.json({ status: "error" }));
});

// 404
app.use((req, res) => {
  res.status(404).json({ task: "", status: "error" });
});
