import { describe, it, expect, beforeAll, beforeEach, afterEach } from "vitest";
import request from "supertest";
import app from "../app";
import { registerAndLogin } from "../auth";
import User from "../models/user";
import Event from "../models/event";

let token: string;

const testData = {
  date: "2023-05-28",
  lat: 55.488265302135666,
  lng: 9.482358325733468,
  icon: "icon",
  description: "Description",
};

beforeEach(async () => {
  await User.deleteMany({});
  await Event.deleteMany({});
});
afterEach(async () => {
  await User.deleteMany({});
  await Event.deleteMany({});
});
beforeAll(async () => {
  token = await registerAndLogin();
});

describe("Event CRUD", () => {
  let createdID: string;

  it("should create a new event", async () => {
    const res = await request(app)
      .post("/event")
      .set("auth-token", token)
      .send(testData);

    expect(res.statusCode).toBe(201);
    expect(res.body._id).toBeDefined();
    createdID = res.body._id;
  });

  it("should get all events", async () => {
    await request(app).post("/event").set("auth-token", token).send(testData);

    const res = await request(app).get("/event");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get an event by ID", async () => {
    const createRes = await request(app)
      .post("/event")
      .set("auth-token", token)
      .send(testData);

    const eventId = createRes.body._id;
    const res = await request(app).get(`/event/${eventId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(eventId);
  });

  it("should update an event", async () => {
    const createRes = await request(app)
      .post("/event")
      .set("auth-token", token)
      .send(testData);

    const eventId = createRes.body._id;
    const updated = { ...testData, description: "Updated description" };
    const res = await request(app)
      .put(`/event/${eventId}`)
      .set("auth-token", token)
      .send(updated);

    expect(res.statusCode).toBe(200);
    expect(res.body.description).toBe("Updated description");
  });

  it("should delete an event", async () => {
    const createRes = await request(app)
      .post("/event")
      .set("auth-token", token)
      .send(testData);

    const eventId = createRes.body._id;
    const res = await request(app)
      .delete(`/event/${eventId}`)
      .set("auth-token", token);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted successfully/i);

    // Confirm deletion
    const getRes = await request(app).get(`/event/${eventId}`);
    expect(getRes.body).toEqual({});
  });
});
