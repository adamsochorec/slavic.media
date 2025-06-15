import { describe, it, expect, beforeAll, beforeEach, afterEach } from "vitest";
import request from "supertest";
import app from "../app";
import { registerAndLogin } from "../auth";
import User from "../models/user";
import Employee from "../models/employee";

let token: string;

const testData = {
  _id: "rasmus",
  name: "Rasmus Sorensen",
  index: 11,
  department: "Engineering",
  description: "A test employee",
  flag: "dk",
  email: "rasmus@slavic.media",
  birthday: "1999-01-03",
  linkedin: "https://linkedin.com/in/slavicmedia",
  github: "https://github.com/slavicmedia",
};

beforeEach(async () => {
  await User.deleteMany({});
  await Employee.deleteMany({});
});
afterEach(async () => {
  await User.deleteMany({});
  await Employee.deleteMany({});
});
beforeAll(async () => {
  token = await registerAndLogin();
});

describe("Employee CRUD", () => {
  let createdID: string;

  it("should create a new employee", async () => {
    const res = await request(app)
      .post("/employee")
      .set("auth-token", token)
      .send(testData);

    expect(res.statusCode).toBe(201);
    expect(res.body._id).toBe(testData._id);
    createdID = res.body._id;
  });

  it("should get all employees", async () => {
    await request(app)
      .post("/employee")
      .set("auth-token", token)
      .send(testData);

    const res = await request(app).get("/employee");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get an employee by ID", async () => {
    await request(app)
      .post("/employee")
      .set("auth-token", token)
      .send(testData);

    const res = await request(app).get(`/employee/${testData._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(testData._id);
  });

  it("should update an employee", async () => {
    await request(app)
      .post("/employee")
      .set("auth-token", token)
      .send(testData);

    const updated = { ...testData, name: "Updated Name" };
    const res = await request(app)
      .put(`/employee/${testData._id}`)
      .set("auth-token", token)
      .send(updated);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Updated Name");
  });

  it("should delete an employee", async () => {
    await request(app)
      .post("/employee")
      .set("auth-token", token)
      .send(testData);

    const res = await request(app)
      .delete(`/employee/${testData._id}`)
      .set("auth-token", token);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted successfully/i);

    // Confirm deletion
    const getRes = await request(app).get(`/employee/${testData._id}`);
    expect(getRes.body).toEqual({});
  });
});
