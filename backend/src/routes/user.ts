import express, { Router } from "express";

import { loginUser } from "../controllers/user";

const router: Router = express.Router();

router.get("/login", loginUser);

export default router;
