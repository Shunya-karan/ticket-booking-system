import { Router } from "express";
import { createUser,getUser,SignInUser } from "../controllers/authControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();


router.post("/signup", createUser);
router.post("/signin", SignInUser);
router.get("/user/:id", authMiddleware, getUser);

export default router;
