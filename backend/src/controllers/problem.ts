import { Request, Response } from "express";
import mongoose, { HydratedDocument } from "mongoose";

import { IProblem, Problem } from "../models/problem";
import { NEETCODE_150, TOPICS } from "../utils/constants";

const topics: string[] = Array.from(TOPICS);

const getProblems = async (req: Request, res: Response) => {
  let { list, topic } = req.query;

  if (topic && !topics.includes(topic as string)) {
    res.status(400).json({ error: "Invalid topic" });
    return;
  }

  try {
    let problems: HydratedDocument<IProblem>[] = await Problem.find(
      topic ? { topic: topic } : {},
    ).sort({
      lastAttempted: -1,
    });

    if (list === "neetcode150") {
      const filteredProblems: HydratedDocument<IProblem>[] = [];
      for (const number of NEETCODE_150.flat()) {
        const problem = problems.find((problem) => problem.number === number);
        if (problem) {
          filteredProblems.push(problem);
        }
      }
      problems = filteredProblems;
    } else if (list === "notinlist") {
      problems = problems.filter(
        (problem) => !NEETCODE_150.flat().includes(problem.number),
      );
    } else if (list !== undefined) {
      res.status(400).json({ error: "Invalid list" });
      return;
    }

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
