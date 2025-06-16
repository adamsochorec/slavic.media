import { beforeAll, beforeEach, afterEach } from "vitest";
import mongoose from "mongoose";
import User from "../models/user";

beforeAll(() => {
  process.env.NODE_ENV = "test";
  process.env.TOKEN_SECRET = "test_secret";
});

beforeEach(async () => {
  // Clear test data before each test
  await User.deleteMany({});
});

afterEach(async () => {
  // Clear test data after each test
  await User.deleteMany({});
});
