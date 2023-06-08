import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get("/api/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.log(error));
  };

  const handleCreateTask = () => {
    axios
      .post("/api/tasks", { title: newTask })
      .then((response) => {
        setTasks([...tasks, response.data]);
        setNewTask("");
      })
      .catch((error) => console.log(error));
  };

  const handleUpdateTask = (id, title, completed) => {
    axios
      .put(`/api/tasks/${id}`, { title, completed })
      .then((response) => {
        const updatedTasks = tasks.map((task) =>
          task.id === response.data.id ? response.data : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteTask = (id) => {
    axios
      .delete(`/api/tasks/${id}`)
      .then(() => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleCreateTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) =>
                handleUpdateTask(task.id, task.title, e.target.checked)
              }
            />
            {task.title}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
