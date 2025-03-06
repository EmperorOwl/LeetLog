import { Request, Response } from "express";
import mongoose, { HydratedDocument } from "mongoose";

import { IProblem, Problem } from "../models/problem";

const getProblems = async (_: Request, res: Response) => {
  try {
    const problems: HydratedDocument<IProblem>[] = await Problem.find().sort({
      lastAttempted: -1,
    });
    res.status(200).json(problems);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

const createProblem = async (req: Request, res: Response) => {
  try {
    const problem: HydratedDocument<IProblem> = await Problem.create({
      ...req.body,
    });
    res.status(201).json(problem);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({ error: `${error}` });
    } else {
      console.error(error);
      res.status(500).send();
    }
  }
};

const getProblem = async (req: Request, res: Response) => {
  const { number } = req.params;
  try {
    const problem: HydratedDocument<IProblem> | null = await Problem.findOne({
      number: number,
    });
    if (!problem) {
      res.status(404).send();
    } else {
      res.status(200).json(problem);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

const updateProblem = async (req: Request, res: Response) => {
  const { number } = req.params;
  try {
    const problem = await Problem.findOneAndUpdate(
      { number: number },
      req.body,
      {
        runValidators: true,
        returnDocument: "after",
      },
    );
    if (!problem) {
      res.status(404).send();
    } else {
      res.status(200).json(problem);
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({ error: `${error}` });
    } else {
      console.error(error);
      res.status(500).send();
    }
  }
};

const deleteProblem = async (req: Request, res: Response) => {
  const { number } = req.params;
  try {
    const problem = await Problem.findOneAndDelete({ number: number });
    if (!problem) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

export { getProblems, getProblem, createProblem, updateProblem, deleteProblem };
