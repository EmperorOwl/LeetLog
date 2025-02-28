import express, { Router } from "express";

import {
  getProblems,
  getProblem,
  createProblem,
  updateProblem,
  deleteProblem,
} from "../controllers/problem";

const router: Router = express.Router();

router.get("/", getProblems);
router.post("/", createProblem);
router.get("/:number", getProblem);
router.put("/:id", updateProblem);
router.delete("/:id", deleteProblem);

export default router;
