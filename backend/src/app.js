const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Mock tasks data
let tasks = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
];

// Define API endpoints
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const task = tasks.find((t) => t.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  task.title = title || task.title;
  task.completed = completed || task.completed;
  res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id !== parseInt(id));
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
