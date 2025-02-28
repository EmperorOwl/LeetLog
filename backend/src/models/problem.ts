import mongoose, { Schema, Model } from "mongoose";

interface IProblem {
  number: number;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  lastAttempted: Date;
  trick: string;
  solution: string;
  comments: string;
}

const problemSchema: Schema<IProblem> = new Schema<IProblem>(
  {
    number: { type: Number },
    title: { type: String },
    difficulty: { type: String, enum: ["easy", "medium", "hard"] },
    lastAttempted: { type: Date },
    trick: { type: String },
    solution: { type: String },
    comments: { type: String },
  },
  { timestamps: true },
);

const Problem: Model<IProblem> = mongoose.model<IProblem>(
  "Problem",
  problemSchema,
);

export { IProblem, Problem };
