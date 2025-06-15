import { describe, it, expect, beforeAll, beforeEach, afterEach } from "vitest";
import request from "supertest";
import app from "../app";
import { registerAndLogin } from "../auth";
import User from "../models/user";
import Slide from "../models/slide";

let token: string;

const testData = {
  _id: "20240312_SLAVIC-MEDIA0583",
  log: "Log",
};

beforeEach(async () => {
  await User.deleteMany({});
  await Slide.deleteMany({});
});
afterEach(async () => {
  await User.deleteMany({});
  await Slide.deleteMany({});
});
beforeAll(async () => {
  token = await registerAndLogin();
});

describe("Slide CRUD", () => {
  let createdID: string;

  it("should create a new slide", async () => {
    const res = await request(app)
      .post("/slide")
      .set("auth-token", token)
      .send(testData);

    expect(res.statusCode).toBe(201);
    expect(res.body._id).toBe(testData._id);
    createdID = res.body._id;
  });

  it("should get all slides", async () => {
    await request(app).post("/slide").set("auth-token", token).send(testData);

    const res = await request(app).get("/slide");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get an slide by ID", async () => {
    await request(app).post("/slide").set("auth-token", token).send(testData);

    const res = await request(app).get(`/slide/${testData._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(testData._id);
  });

  it("should update an slide", async () => {
    await request(app).post("/slide").set("auth-token", token).send(testData);

    const updated = { ...testData, log: "Updated log" };
    const res = await request(app)
      .put(`/slide/${testData._id}`)
      .set("auth-token", token)
      .send(updated);

    expect(res.statusCode).toBe(200);
    expect(res.body.log).toBe("Updated log");
  });

  it("should delete an slide", async () => {
    await request(app).post("/slide").set("auth-token", token).send(testData);

    const res = await request(app)
      .delete(`/slide/${testData._id}`)
      .set("auth-token", token);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted successfully/i);

    // Confirm deletion
    const getRes = await request(app).get(`/slide/${testData._id}`);
    expect(getRes.body).toEqual({});
  });
});
