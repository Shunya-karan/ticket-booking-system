import { Router } from "express";
import { createUser,SignInUser } from "../controllers/authControllers.js";

const router = Router();

router.post("/signup", createUser);
router.post("/signin", SignInUser);

export default router;
