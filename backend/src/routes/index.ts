import express from "express";
import { signup } from "../controllers/auth/sign-up/signup";
import { signin } from "../controllers/auth/sign-in/signin";
import { createTask, getTasks, updateTask } from "../controllers/tasks/tasks";
import { verify } from "../controllers/auth/verify/verify";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/verify", verify);
router.get("/tasks", getTasks);
router.post("/task", createTask);
router.put("/update-task", updateTask);


export default router;
