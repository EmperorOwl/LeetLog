import http from "http";
import dotenv from "dotenv";

import app from "../app";
import { connectDatabase, dropDatabase, disconnectDatabase } from "../db";
import { checkAdmin } from "../auth";

dotenv.config();

let server: http.Server;

beforeAll(async () => {
  await connectDatabase();
  await dropDatabase();
  await checkAdmin();
  server = app.listen(0, async () => {
    console.log(`Test server opened`);
  });
});

afterAll(async () => {
  await disconnectDatabase();
  server.close();
  console.log("Test server closed");
});
