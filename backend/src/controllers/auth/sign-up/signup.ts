import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { getMongoDBInstance } from "../../../config/mongo";
const SALT_ROUNDS = 10;

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Missing fields" });
        }

        const db = await getMongoDBInstance();
        const publicCollection = db.collection("public");
        const privateCollection = db.collection("private");
        const existingUser = await privateCollection.findOne({ email });

        if (existingUser) {
            res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const uuid = uuidv4();
        await publicCollection.insertOne({ email, createdAt: new Date(), uid: uuid, verified: false });
        await privateCollection.insertOne({ email, password: hashedPassword, uid: uuid, createdAt: new Date() });

        res.status(201).json({ message: "User created successfully" });

    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ message: "Internal Server Error" });

    }
}