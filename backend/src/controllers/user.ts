import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { IUser, User } from "../models/user";

const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    // Find user
    const user: HydratedDocument<IUser> | null = await User.findOne({
      username,
    });
    if (!user) {
      res.status(401).json({ error: "Login failed" });
      return;
    }
    // Check password
    const passwordMatch: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (!passwordMatch) {
      res.status(401).json({ error: "Login failed" });
      return;
    }
    // Generate token
    const SECRET_KEY: string | undefined = process.env.SECRET_KEY;
    if (!SECRET_KEY) {
      res.status(500).json({ error: "Login failed" });
      return;
    }
    const token: string = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

export { loginUser };
