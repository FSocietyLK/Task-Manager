import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./App.module.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    return axios
      .get("http://localhost:8000/api/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.log(error));
  };

  const handleCreateTask = () => {
    return axios
      .post("http://localhost:8000/api/tasks", { title: newTask })
      .then((response) => {
        setTasks([...tasks, response.data]);
        setNewTask("");
      })
      .catch((error) => console.log(error));
  };

  const handleUpdateTask = (id, title, completed) => {
    axios
      .put(`http://localhost:8000/api/tasks/${id}`, { title, completed })
      .then((response) => {
        const updatedTasks = tasks.map((task) =>
          task.id === response.data.id ? response.data : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteTask = (id) => {
    return axios
      .delete(`http://localhost:8000/api/tasks/${id}`)
      .then(() => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.appContainer}>
      <h1>Task Manager</h1>
      <input
        type="text"
        placeholder="New Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className={styles.newTaskInput}
      />
      <button onClick={handleCreateTask} className={styles.taskButton}>
        Add Task
      </button>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) =>
                handleUpdateTask(task.id, task.title, e.target.checked)
              }
              className={styles.taskCheckbox}
            />
            {task.title}
            <button
              onClick={() => handleDeleteTask(task.id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
