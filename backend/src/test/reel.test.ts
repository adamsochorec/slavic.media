import { describe, it, expect, beforeAll, beforeEach, afterEach } from "vitest";
import request from "supertest";
import app from "../app";
import { registerAndLogin } from "../auth";
import User from "../models/user";
import Reel from "../models/reel";

let token: string;

const testData = {
  _id: "DBqXwkhI8nH",
  platform: "Platform",
  flag: "no",
  url: "Url",
};

beforeEach(async () => {
  await User.deleteMany({});
  await Reel.deleteMany({});
});
afterEach(async () => {
  await User.deleteMany({});
  await Reel.deleteMany({});
});
beforeAll(async () => {
  token = await registerAndLogin();
});

describe("Reel CRUD", () => {
  let createdID: string;

  it("should create a new reel", async () => {
    const res = await request(app)
      .post("/reel")
      .set("auth-token", token)
      .send(testData);

    expect(res.statusCode).toBe(201);
    expect(res.body._id).toBe(testData._id);
    createdID = res.body._id;
  });

  it("should get all reels", async () => {
    await request(app).post("/reel").set("auth-token", token).send(testData);

    const res = await request(app).get("/reel");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get an reel by ID", async () => {
    await request(app).post("/reel").set("auth-token", token).send(testData);

    const res = await request(app).get(`/reel/${testData._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(testData._id);
  });

  it("should update an reel", async () => {
    await request(app).post("/reel").set("auth-token", token).send(testData);

    const updated = { ...testData, platform: "Updated platform" };
    const res = await request(app)
      .put(`/reel/${testData._id}`)
      .set("auth-token", token)
      .send(updated);

    expect(res.statusCode).toBe(200);
    expect(res.body.platform).toBe("Updated platform");
  });

  it("should delete an reel", async () => {
    await request(app).post("/reel").set("auth-token", token).send(testData);

    const res = await request(app)
      .delete(`/reel/${testData._id}`)
      .set("auth-token", token);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted successfully/i);

    // Confirm deletion
    const getRes = await request(app).get(`/reel/${testData._id}`);
    expect(getRes.body).toEqual({});
  });
});
