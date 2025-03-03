import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";

import userRoutes from "./routes/user";
import problemRoutes from "./routes/problem";

const app: Express = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: process.env.FRONTEND_URL }));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/problems", problemRoutes);

export default app;
