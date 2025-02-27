import mongoose, { Schema, Model } from "mongoose";

interface IUser {
  username: string;
  password: string;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export { IUser, User };
