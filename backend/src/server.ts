import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";
import { adminExists, createAdmin } from "./auth";

dotenv.config();

const main = async () => {
  // Connect to database
  const mongoURI: string | undefined = process.env.MONGO_URI;
  const dbName: string | undefined = process.env.DB_NAME;
  if (!mongoURI || !dbName) {
    throw new Error("MONGO_URI or DB_NAME is not defined");
  }
  await mongoose.connect(mongoURI, { dbName: dbName });
  console.log(`Connected to ${dbName} db`);
  // Check admin user
  const username: string | undefined = process.env.ADMIN_USERNAME;
  const password: string | undefined = process.env.ADMIN_PASSWORD;
  if (!username || !password) {
    throw new Error("ADMIN_USERNAME or ADMIN_PASSWORD is not defined");
  } //
  if (await adminExists(username)) {
    console.log(`Admin user with username ${username} found`);
  } else {
    await createAdmin(username, password);
    console.log(`Admin user with username ${username} created`);
  }
  // Start server
  const port: string | undefined = process.env.PORT;
  if (!port) {
    throw new Error("PORT is not defined");
  }
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

main();
