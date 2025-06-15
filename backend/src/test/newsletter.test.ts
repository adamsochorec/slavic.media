import { describe, it, expect, beforeAll, beforeEach, afterEach } from "vitest";
import request from "supertest";
import app from "../app";
import { registerAndLogin } from "../auth";
import User from "../models/user";
import Newsletter from "../models/newsletter";

let token: string;

const testData = {
  _id: "adam.sochorec@icloud.com",
  source: "https://slavic.media/",
  date: "2025-05-26T13:50:15.011Z",
};

beforeEach(async () => {
  await User.deleteMany({});
  await Newsletter.deleteMany({});
});
afterEach(async () => {
  await User.deleteMany({});
  await Newsletter.deleteMany({});
});
beforeAll(async () => {
  token = await registerAndLogin();
});

describe("Newsletter CRUD", () => {
  let createdID: string;

  it("should create a new newsletter", async () => {
    const res = await request(app)
      .post("/newsletter")
      .set("auth-token", token)
      .send(testData);

    expect(res.statusCode).toBe(201);
    expect(res.body._id).toBe(testData._id);
    createdID = res.body._id;
  });

  it("should get all newsletters", async () => {
    await request(app)
      .post("/newsletter")
      .set("auth-token", token)
      .send(testData);

    const res = await request(app).get("/newsletter");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get an newsletter by ID", async () => {
    await request(app)
      .post("/newsletter")
      .set("auth-token", token)
      .send(testData);

    const res = await request(app).get(`/newsletter/${testData._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(testData._id);
  });

  it("should update an newsletter", async () => {
    await request(app)
      .post("/newsletter")
      .set("auth-token", token)
      .send(testData);

    const updated = { ...testData, source: "localhost:3000" };
    const res = await request(app)
      .put(`/newsletter/${testData._id}`)
      .set("auth-token", token)
      .send(updated);

    expect(res.statusCode).toBe(200);
    expect(res.body.source).toBe("localhost:3000");
  });

  it("should delete an newsletter", async () => {
    await request(app)
      .post("/newsletter")
      .set("auth-token", token)
      .send(testData);

    const res = await request(app)
      .delete(`/newsletter/${testData._id}`)
      .set("auth-token", token);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted successfully/i);

    // Confirm deletion
    const getRes = await request(app).get(`/newsletter/${testData._id}`);
    expect(getRes.body).toEqual({});
  });
});
