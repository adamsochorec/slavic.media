import { describe, it, expect, beforeAll, beforeEach, afterEach } from "vitest";
import request from "supertest";
import app from "../app";
import { registerAndLogin } from "../auth";
import User from "../models/user";
import Employee from "../models/employee";

let token: string;

const testData = {
  _id: "rasmus",
  name: "Name",
  index: 11,
  department: "Department",
  description: "Description",
  flag: "dk",
  email: "rasmus@slavic.media",
  birthday: "2023-05-28",
  linkedin: "https://linkedin.com/company/slavicmedia",
  github: "https://github.com/",
};

beforeEach(async () => {
  await Employee.deleteMany({});
  token = await registerAndLogin();
});
afterEach(async () => {
  await Employee.deleteMany({});
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

    const updated = { ...testData, name: "Updated name" };
    const res = await request(app)
      .put(`/employee/${testData._id}`)
      .set("auth-token", token)
      .send(updated);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Updated name");
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
