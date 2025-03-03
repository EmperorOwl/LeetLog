import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { HydratedDocument } from "mongoose";

import { IUser, User } from "./models/user";
import { dropCollection } from "./db";

const adminExists = async (username: string) => {
  const user: HydratedDocument<IUser> | null = await User.findOne({ username });
  return user != null;
};

const createAdmin = async () => {
  const username: string | undefined = process.env.ADMIN_USERNAME;
  const password: string | undefined = process.env.ADMIN_PASSWORD;
  if (!username || !password) {
    throw new Error("ADMIN_USERNAME or ADMIN_PASSWORD is not defined");
  }
  await dropCollection("users");
  const hashedPassword: string = await bcrypt.hash(password, 10);
  const user: HydratedDocument<IUser> = new User({
    username,
    password: hashedPassword,
  });
  await user.save();
  console.log(`Admin user with username ${username} created`);
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = req.header("Authorization");
  if (!token) {
    res.status(401).json({ error: "Access denied" });
    return;
  }
  const secretKey: string | undefined = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new Error("SECRET_KEY is not defined");
  }
  try {
    const _ = jwt.verify(token, secretKey);
    next();
  } catch (error) {
    res.status(401).json({ error: "Access denied" });
  }
};

export { adminExists, createAdmin, verifyToken };
