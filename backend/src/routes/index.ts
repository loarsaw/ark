import express from "express";
import { signup } from "../controllers/auth/sign-up/signup";
import { signin } from "../controllers/auth/sign-in/signin";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
export default router;
