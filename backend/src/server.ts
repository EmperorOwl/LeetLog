import dotenv from "dotenv";

import app from "./app";
import { connectDatabase } from "./db";
import { checkAdmin } from "./auth";

dotenv.config();

const main = async () => {
  await connectDatabase();
  await checkAdmin();
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
