import express, { Router } from "express";

import { loginUser } from "../controllers/user";

const router: Router = express.Router();

router.post("/login", loginUser);

export default router;
