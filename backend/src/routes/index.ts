import express from "express";
import { signup } from "../controllers/auth/sign-up/signup";
import { signin } from "../controllers/auth/sign-in/signin";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/tasks/tasks";
import { verify } from "../controllers/auth/verify/verify";
import { getPublicProfile } from "../controllers/auth/profile/profile";
import verifyAuth from "../middleware/auth.middleware";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/verify", verify);
router.use(verifyAuth)
router.post("/user", getPublicProfile)
router.get("/tasks", getTasks);
router.post("/task", createTask);
router.put("/update-task", updateTask);
router.put("/delete", deleteTask);



export default router;
