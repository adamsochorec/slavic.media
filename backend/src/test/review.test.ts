import { describe, it, expect, beforeAll, beforeEach, afterEach } from "vitest";
import request from "supertest";
import app from "../app";
import { registerAndLogin } from "../auth";
import User from "../models/user";
import Review from "../models/review";

let token: string;

const testData = {
  _id: 0,
  img: "Img",
  name: "Name",
  occupation: "Occupation",
  profileLink: "Profile link",
  rating: 5,
  fullReview: "Full review",
  message: "Message",
};

beforeEach(async () => {
  await Review.deleteMany({});
  token = await registerAndLogin();
});
afterEach(async () => {
  await Review.deleteMany({});
});

describe("Review CRUD", () => {
  let createdID: string;

  it("should create a new review", async () => {
    const res = await request(app)
      .post("/review")
      .set("auth-token", token)
      .send(testData);

    expect(res.statusCode).toBe(201);
    expect(res.body._id).toBe(testData._id);
    createdID = res.body._id;
  });

  it("should get all reviews", async () => {
    await request(app).post("/review").set("auth-token", token).send(testData);

    const res = await request(app).get("/review");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get an review by ID", async () => {
    await request(app).post("/review").set("auth-token", token).send(testData);

    const res = await request(app).get(`/review/${testData._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(testData._id);
  });

  it("should update an review", async () => {
    await request(app).post("/review").set("auth-token", token).send(testData);

    const updated = { ...testData, rating: 2 };
    const res = await request(app)
      .put(`/review/${testData._id}`)
      .set("auth-token", token)
      .send(updated);

    expect(res.statusCode).toBe(200);
    expect(res.body.rating).toBe(2);
  });

  it("should delete an review", async () => {
    await request(app).post("/review").set("auth-token", token).send(testData);

    const res = await request(app)
      .delete(`/review/${testData._id}`)
      .set("auth-token", token);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted successfully/i);

    // Confirm deletion
    const getRes = await request(app).get(`/review/${testData._id}`);
    expect(getRes.body).toEqual({});
  });
});
