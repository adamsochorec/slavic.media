import { describe, it, beforeEach, afterEach, expect } from "vitest";
import request from "supertest";
import app from "../app";
import User from "../models/user";

const userData = {
  name: "Test User",
  email: "test@slavic.media",
  password: "password123",
};

beforeEach(async () => {
  await User.deleteMany({});
});
afterEach(async () => {
  await User.deleteMany({});
});

describe("User Registration and Login", () => {
  it("registers a new user", async () => {
    const res = await request(app).post("/user/register").send(userData);
    expect(res.status).toBe(200);
    expect(res.body.error).toBeNull();
    expect(res.body.data).toBeDefined();
  });

  it("logs in with correct credentials", async () => {
    await request(app).post("/user/register").send(userData);
    const res = await request(app)
      .post("/user/login")
      .send({ email: userData.email, password: userData.password });
    expect(res.status).toBe(200);
    expect(res.body.data.token).toBeDefined();
  });

  it("does not allow registering with the same email twice", async () => {
    // First registration should succeed
    const firstRes = await request(app).post("/user/register").send(userData);
    expect(firstRes.status).toBe(200);
    expect(firstRes.body.error).toBeNull();

    // Second registration with the same email should fail
    const secondRes = await request(app).post("/user/register").send(userData);
    expect(secondRes.status).toBe(400);
    expect(secondRes.body.error).toBe("Email already exists");
  });
});
