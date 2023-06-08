const request = require("supertest");
const app = require("./app");

describe("Task Manager API", () => {
  it("should get all tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it("should create a new task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "New Task", completed: false });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("New Task");
    expect(res.body.completed).toBe(false);
  });

  it("should update a task", async () => {
    const tasksRes = await request(app).get("/api/tasks");
    const taskId = tasksRes.body[0].id;
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ title: "Updated Task", completed: true });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Updated Task");
    expect(res.body.completed).toBe(true);
  });

  it("should delete a task", async () => {
    const tasksRes = await request(app).get("/api/tasks");
    const taskId = tasksRes.body[0].id;
    const res = await request(app).delete(`/api/tasks/${taskId}`);
    expect(res.status).toBe(204);
  });
});
