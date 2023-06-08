import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import App from "./App";

jest.mock("axios");

describe("App", () => {
  it("should render Task Manager title", () => {
    render(<App />);
    const titleElement = screen.getByText("Task Manager");
    expect(titleElement).toBeInTheDocument();
  });

  it("should add a new task", async () => {
    axios.post.mockResolvedValueOnce({
      data: { id: 3, title: "New Task", completed: false },
    });

    render(<App />);
    const taskInput = screen.getByLabelText("Task");
    const addButton = screen.getByText("Add Task");

    fireEvent.change(taskInput, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("/api/tasks", {
      title: "New Task",
    });

    await screen.findByText("New Task");
  });

  it("should mark a task as completed", async () => {
    const tasks = [
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: false },
    ];
    axios.get.mockResolvedValueOnce({ data: tasks });

    render(<App />);
    await screen.findAllByRole("checkbox");

    const checkbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkbox);

    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith("/api/tasks/1", {
      title: "Task 1",
      completed: true,
    });
  });

  it("should delete a task", async () => {
    const tasks = [
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: false },
    ];
    axios.get.mockResolvedValueOnce({ data: tasks });

    render(<App />);
    await screen.findAllByRole("button");

    const deleteButton = screen.getAllByRole("button")[0];
    fireEvent.click(deleteButton);

    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith("/api/tasks/1");
  });
});
