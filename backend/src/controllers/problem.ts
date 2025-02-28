import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";

import { IProblem, Problem } from "../models/problem";

const getProblems = async (_: Request, res: Response) => {
  try {
    const problems: HydratedDocument<IProblem>[] = await Problem.find().sort({
      createdAt: -1,
    });
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ error: "Failed to get problems" });
  }
};

const getProblem = async (req: Request, res: Response) => {
  const { number } = req.params;
  try {
    const problem: HydratedDocument<IProblem> | null = await Problem.findOne({
      number: number,
    });
    if (!problem) {
      res.status(404).json({ error: "Problem not found" });
      return;
    }
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({ error: "Failed to get problem" });
  }
};

const createProblem = async (req: Request, res: Response) => {
  try {
    const problem: HydratedDocument<IProblem> = await Problem.create({
      ...req.body,
    });
    res.status(201).json(problem);
  } catch (error) {
    res.status(500).json({ error: "Failed to create problem" });
  }
};

const updateProblem = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const problem = await Problem.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({ error: "Failed to update problem" });
  }
};

const deleteProblem = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Problem.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete problem" });
  }
};

export { getProblems, getProblem, createProblem, updateProblem, deleteProblem };
