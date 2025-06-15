import { describe, it, expect, beforeAll, beforeEach, afterEach } from "vitest";
import request from "supertest";
import app from "../app";
import { registerAndLogin } from "../auth";
import User from "../models/user";
import Employee from "../models/employee";

let token: string;

const employeeData = {
  _id: "emp1",
  name: "John Doe",
  index: 11,
  department: "Engineering",
  description: "A test employee",
  flag: "cz",
  email: "john.doe@slavic.media",
  birthday: "1999-01-03",
  linkedin: "https://linkedin.com/in/johndoe",
  github: "https://github.com/johndoe",
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

describe("Employee API", () => {
  it("should create a new employee", async () => {
    const res = await request(app)
      .post("/employee")
      .set("auth-token", token)
      .send(employeeData);
    console.log(res.body);

    expect(res.statusCode).toBe(201);
  });
});
