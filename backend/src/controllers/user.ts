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
      res.status(404).json({ error: "Incorrect username" });
      return;
    }
    // Check password
    const passwordMatch: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (!passwordMatch) {
      res.status(401).json({ error: "Incorrect password" });
      return;
    }
    // Generate token
    const secretKey: string | undefined = process.env.SECRET_KEY;
    if (!secretKey) {
      res.status(500).send();
      return;
    }
    const token: string = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

export { loginUser };
