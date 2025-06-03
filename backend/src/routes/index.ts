import express from "express";
import { signup } from "../controllers/auth/sign-up/signup";
import { signin } from "../controllers/auth/sign-in/signin";
import { createTask, getTasks } from "../controllers/tasks/tasks";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/tasks", getTasks);
router.post("/task", createTask);

export default router;
