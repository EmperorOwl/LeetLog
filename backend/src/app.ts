import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import userRoutes from "./routes/user";
import { verifyToken } from "./auth";

const app: Express = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.get("/protected", verifyToken, (_: Request, res: Response) => {
  res.send("Protected route");
});
app.get("/", (_: Request, res: Response) => {
  res.send("Hello World!");
});
app.use("/api/user", userRoutes);

export default app;
