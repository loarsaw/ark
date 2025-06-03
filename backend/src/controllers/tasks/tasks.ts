import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { getMongoDBInstance } from "../../config/mongo";

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { title, status, id } = req.body;

        const db = await getMongoDBInstance();
        const tasks = db.collection("tasks");

        const result = await tasks.updateOne(
            { taskId: id },
            {
                $set: {
                    title,
                    status,
                    updatedAt: new Date(),
                },
            }
        );

        if (result.matchedCount === 0) {
            res.status(404).json({ message: "Task not found" });
            return;
        }

        res.status(200).json({ message: "Task updated" });
    } catch (err) {
        console.error("Edit Task Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const { ownerId, title, status } = req.body;
        if (!ownerId || !title) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        const db = await getMongoDBInstance();
        const tasks = db.collection("tasks");

        const task = {
            taskId: uuidv4(),
            ownerId,
            title,
            status: status,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await tasks.insertOne(task);

        res.status(201).json({ message: "Task created", task });
    } catch (err) {
        console.error("Create Task Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getTasks = async (req: Request, res: Response) => {
    try {
        const { ownerId } = req.query;

        if (!ownerId) {
            res.status(400).json({ message: "ownerId is required" });
            return;
        }

        const db = await getMongoDBInstance();
        const tasks = db.collection("tasks");

        const userTasks = await tasks.find({ ownerId }).toArray();
        res.status(200).json({ tasks: userTasks });
    } catch (err) {
        console.error("Get Tasks Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
