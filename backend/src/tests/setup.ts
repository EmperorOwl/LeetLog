import http from "http";
import dotenv from "dotenv";

import app from "../app";
import { connectDatabase, disconnectDatabase } from "../db";
import { createAdmin } from "../auth";

dotenv.config();

let server: http.Server;

beforeAll(async () => {
  await connectDatabase();
  await createAdmin();
  server = app.listen(0, async () => {
    console.log(`Test server opened`);
  });
});

afterAll(async () => {
  await disconnectDatabase();
  server.close();
  console.log("Test server closed");
});
