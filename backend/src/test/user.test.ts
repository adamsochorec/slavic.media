import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app";
import User from "../models/user";

const userData = {
  name: "Tester",
  email: "test@slavic.media",
  password: "chelyabinsk",
};

describe("User Registration and Login", () => {
  it("registers a new user", async () => {
    const res = await request(app).post("/user/register").send(userData);

    expect(res.status).toBe(200);
    expect(res.body.error).toBeNull();
    expect(res.body.data).toBeDefined();
  });

  it("logs in with correct credentials", async () => {
    // Register first
    await request(app).post("/user/register").send(userData);

    // Wait a bit to ensure registration is complete
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Try login
    const res = await request(app).post("/user/login").send({
      email: userData.email,
      password: userData.password,
    });

    expect(res.status).toBe(200);
    expect(res.body.data.token).toBeDefined();
  });
});
