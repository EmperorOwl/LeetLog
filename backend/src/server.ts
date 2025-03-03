import dotenv from "dotenv";

import app from "./app";
import { connectDatabase } from "./db";
import { createAdmin } from "./auth";

dotenv.config();

const main = async () => {
  await connectDatabase();
  await createAdmin();
  const port: string | undefined = process.env.PORT;
  if (!port) {
    throw new Error("PORT is not defined");
  }
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

main();
