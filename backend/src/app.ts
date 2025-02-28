import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";

import { verifyToken } from "./auth";
import userRoutes from "./routes/user";
import problemRoutes from "./routes/problem";

const app: Express = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: process.env.FRONTEND_URL }));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/problems", verifyToken, problemRoutes);

export default app;
