import { describe, it, expect, beforeAll, beforeEach, afterEach } from "vitest";
import request from "supertest";
import app from "../app";
import { registerAndLogin } from "../auth";
import User from "../models/user";
import Video from "../models/video";

let token: string;

const testData = {
  _id: "video",
  index: 8,
  flag: "dk",
  title: "Title",
  url: "Url",
  year: "2025",
  client: {
    name: "Client name",
    url: "Client website",
  },
  category: "Category",
};

beforeEach(async () => {
  await Video.deleteMany({});
  token = await registerAndLogin();
});
afterEach(async () => {
  await Video.deleteMany({});
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

    const updated = { ...testData, title: "Updated title" };
    const res = await request(app)
      .put(`/video/${testData._id}`)
      .set("auth-token", token)
      .send(updated);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated title");
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
