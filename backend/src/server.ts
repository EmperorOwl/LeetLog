import dotenv from "dotenv";
import http from "http";
import https from "https";
import fs from "fs";
import path from "path";

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

  const isProd = process.env.NODE_ENV === "prod";

  if (isProd) {
    // Set up SSL certificate
    const sslOptions = {
      key: fs.readFileSync(path.resolve('/etc/letsencrypt/live/app.raylin.dev/privkey.pem')),
      cert: fs.readFileSync(path.resolve('/etc/letsencrypt/live/app.raylin.dev/fullchain.pem'))
    };
    // Create HTTPS server
    https.createServer(sslOptions, app).listen(port, () => {
      console.log(`HTTPS Server running on port ${port}`);
    });
  } else {
    // Create HTTP server
    http.createServer(app).listen(port, () => {
      console.log(`HTTP Server running on port ${port}`);
    });
  }
};

main();