import { Request, Response } from "express";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { HydratedDocument } from "mongoose";
import { IUser, User } from "./models/user";

const adminExists = async (username: string) => {
  const user: HydratedDocument<IUser> | null = await User.findOne({ username });
  return user != null;
};

const createAdmin = async (username: string, password: string) => {
  const hashedPassword: string = await bcrypt.hash(password, 10);
  const user: HydratedDocument<IUser> = new User({
    username,
    password: hashedPassword,
  });
  await user.save();
};

const verifyToken = (req: Request, res: Response, next: () => void) => {
  const token: string | undefined = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }
  try {
    const SECRET_KEY: string | undefined = process.env.SECRET_KEY;
    if (!SECRET_KEY) {
      return res.status(500).json({ error: "Access denied" });
    }
    const _ = jwt.verify(token, SECRET_KEY);
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export { adminExists, createAdmin, verifyToken };
