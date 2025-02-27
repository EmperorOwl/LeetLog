import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import userRoutes from "./routes/user";

const app: Express = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.get("/", (_: Request, res: Response) => {
  res.send("Hello World!");
});
app.use("/api/user", userRoutes);

export default app;
