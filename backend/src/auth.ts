import request from "supertest";
import app from "./app";

export const testUser = {
  name: "Test User",
  email: "testuser@slavic.media",
  password: "password123",
};

export async function registerAndLogin(user = testUser) {
  // Register user (ignore errors if already exists)
  await request(app).post("/user/register").send(user);

  // Login and get token
  const res = await request(app).post("/user/login").send({
    email: user.email,
    password: user.password,
  });

  if (!res.body?.data?.token) {
    throw new Error("Failed to get auth token");
  }
  return res.body.data.token as string;
}
