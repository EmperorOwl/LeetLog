import express, { Router } from "express";

import { verifyToken } from "../auth";
import {
  getProblems,
  getProblem,
  createProblem,
  updateProblem,
  deleteProblem,
} from "../controllers/problem";

const router: Router = express.Router();

router.get("/", getProblems);
router.post("/", verifyToken, createProblem);
router.get("/:number", getProblem);
router.put("/:number", verifyToken, updateProblem);
router.delete("/:number", verifyToken, deleteProblem);

export default router;
