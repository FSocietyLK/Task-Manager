import React from "react";
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import axios from "axios";
import App from "./App";

jest.mock("axios");

afterEach(() => jest.clearAllMocks());

describe("App", () => {
  it("should render Task Manager title", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    render(<App />);
    await waitFor(() => screen.getByText("Task Manager"));
    const titleElement = screen.getByText("Task Manager");
    expect(titleElement).toBeInTheDocument();
  });

  it("should add a new task", async () => {
    axios.post.mockResolvedValueOnce({
      data: { id: 3, title: "New Task", completed: false },
    });
    axios.get.mockResolvedValueOnce({
      data: [],
    });

    render(<App />);
    const taskInput = screen.getByPlaceholderText("New Task");
    const addButton = screen.getByText("Add Task");

    fireEvent.change(taskInput, { target: { value: "New Task" } });
    await act(async () => {
      fireEvent.click(addButton);
    });

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("http://localhost:8000/api/tasks", {
      title: "New Task",
    });

    await waitFor(() => screen.getByText("New Task"));
  });

  it("should mark a task as completed", async () => {
    const tasks = [
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: false },
    ];
    axios.get.mockResolvedValueOnce({ data: tasks });
    axios.put.mockResolvedValueOnce({
      data: { id: 1, title: "Task 1", completed: true },
    });

    render(<App />);
    await screen.findAllByRole("checkbox");

    const checkbox = screen.getAllByRole("checkbox")[0];
    await act(async () => {
      fireEvent.click(checkbox);
    });

    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith(
      "http://localhost:8000/api/tasks/1",
      {
        title: "Task 1",
        completed: true,
      }
    );
  });

  it("should delete a task", async () => {
    const tasks = [
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: false },
    ];
    axios.get.mockResolvedValueOnce({ data: tasks });
    axios.delete.mockResolvedValueOnce({});

    render(<App />);
    await screen.findAllByText("Delete");

    const deleteButton = screen.getAllByText("Delete")[0];
    await act(async () => {
      fireEvent.click(deleteButton);
    });

    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith(
      "http://localhost:8000/api/tasks/1"
    );
  });
});
