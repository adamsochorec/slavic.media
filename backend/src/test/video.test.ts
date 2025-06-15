import { describe, it, expect, beforeAll, beforeEach, afterEach } from "vitest";
import request from "supertest";
import app from "../app";
import { registerAndLogin } from "../auth";
import User from "../models/user";
import Video from "../models/video";

let token: string;

const testData = {
  _id: "arun-in-denmark",
  index: 8,
  flag: "dk",
  title: "Arun in Denmark Keynote",
  url: "youtube.com/watch?v=84EQLc1oxio",
  year: "2025",
  client: {
    name: "Arun in Denmark",
    url: "youtube.com/channel/UC5HbR-mxiKW19Z9A1OjCM1Q",
  },
  category: "Vlog",
};

beforeEach(async () => {
  await User.deleteMany({});
  await Video.deleteMany({});
});
afterEach(async () => {
  await User.deleteMany({});
  await Video.deleteMany({});
});
beforeAll(async () => {
  token = await registerAndLogin();
});

describe("Video CRUD", () => {
  let createdID: string;

  it("should create a new video", async () => {
    const res = await request(app)
      .post("/video")
      .set("auth-token", token)
      .send(testData);

    expect(res.statusCode).toBe(201);
    expect(res.body._id).toBe(testData._id);
    createdID = res.body._id;
  });

  it("should get all videos", async () => {
    await request(app).post("/video").set("auth-token", token).send(testData);

    const res = await request(app).get("/video");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get an video by ID", async () => {
    await request(app).post("/video").set("auth-token", token).send(testData);

    const res = await request(app).get(`/video/${testData._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(testData._id);
  });

  it("should update an video", async () => {
    await request(app).post("/video").set("auth-token", token).send(testData);

    const updated = { ...testData, flag: "fi" };
    const res = await request(app)
      .put(`/video/${testData._id}`)
      .set("auth-token", token)
      .send(updated);

    expect(res.statusCode).toBe(200);
    expect(res.body.flag).toBe("fi");
  });

  it("should delete an video", async () => {
    await request(app).post("/video").set("auth-token", token).send(testData);

    const res = await request(app)
      .delete(`/video/${testData._id}`)
      .set("auth-token", token);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted successfully/i);

    // Confirm deletion
    const getRes = await request(app).get(`/video/${testData._id}`);
    expect(getRes.body).toEqual({});
  });
});
