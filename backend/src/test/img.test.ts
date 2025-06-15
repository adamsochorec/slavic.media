import { describe, it, expect, beforeAll, beforeEach, afterEach } from "vitest";
import request from "supertest";
import app from "../app";
import { registerAndLogin } from "../auth";
import User from "../models/user";
import Img from "../models/gallery";

let token: string;

const testData = {
  _id: "portrait",
  index: 3,
  title: "Colorful Portrait",
  columns: [
    [
      {
        _id: "hvalp",
        alt: "Alt",
        title: "Title",
        flag: "dk",
      },
    ],
    [
      {
        _id: "2021-04-25-00693",
        alt: "Alt",
        title: "Title",
        flag: "cz",
      },
    ],
    [
      {
        _id: "2021-04-14-00608",
        alt: "Alt",
        title: "Title",
        flag: "cz",
      },
    ],
    [
      {
        _id: "2023-04-03-08707",
        alt: "Alt",
        title: "Title",
        flag: "dk",
      },
    ],
  ],
  description: "Description",
};

beforeEach(async () => {
  await User.deleteMany({});
  await Img.deleteMany({});
});
afterEach(async () => {
  await User.deleteMany({});
  await Img.deleteMany({});
});
beforeAll(async () => {
  token = await registerAndLogin();
});

describe("Img CRUD", () => {
  let createdID: string;

  it("should create a new img", async () => {
    const res = await request(app)
      .post("/img")
      .set("auth-token", token)
      .send(testData);

    expect(res.statusCode).toBe(201);
    expect(res.body._id).toBe(testData._id);
    createdID = res.body._id;
  });

  it("should get all reviews", async () => {
    await request(app).post("/img").set("auth-token", token).send(testData);

    const res = await request(app).get("/img");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get an img by ID", async () => {
    await request(app).post("/img").set("auth-token", token).send(testData);

    const res = await request(app).get(`/img/${testData._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(testData._id);
  });

  it("should update an img", async () => {
    await request(app).post("/img").set("auth-token", token).send(testData);

    const updated = { ...testData, title: "Updated title" };
    const res = await request(app)
      .put(`/img/${testData._id}`)
      .set("auth-token", token)
      .send(updated);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated title");
  });

  it("should delete an img", async () => {
    await request(app).post("/img").set("auth-token", token).send(testData);

    const res = await request(app)
      .delete(`/img/${testData._id}`)
      .set("auth-token", token);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted successfully/i);

    // Confirm deletion
    const getRes = await request(app).get(`/img/${testData._id}`);
    expect(getRes.body).toEqual({});
  });
});
