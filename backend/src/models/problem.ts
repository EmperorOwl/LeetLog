import mongoose, { Schema, Model } from "mongoose";

import { DIFFICULTIES, TOPICS } from "../utils/constants";

type Difficulty = (typeof DIFFICULTIES)[number];
type Topic = (typeof TOPICS)[number];

interface IProblem {
  number: number;
  title: string;
  difficulty: Difficulty;
  topic: Topic;
  lastAttempted: Date;
  trick: string;
  solution: string;
  comments: string;
}

const problemSchema: Schema<IProblem> = new Schema<IProblem>(
  {
    number: { type: Number, unique: true, required: true },
    title: { type: String, unique: true, required: true },
    difficulty: {
      type: String,
      enum: DIFFICULTIES,
      required: true,
    },
    topic: { type: String, enum: TOPICS },
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
