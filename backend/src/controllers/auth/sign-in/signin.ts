import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getMongoDBInstance } from "../../../config/mongo";

const JWT_SECRET = process.env.JWT_SECRET ?? "";

export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "Missing credentials" });
            return
        }

        const db = await getMongoDBInstance();
        if (!db) {
            res.status(500).json({ message: "DB connection failed" });

            return
        }

        const privateCollection = db.collection("private");

        const user = await privateCollection.findOne({ email });
        if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
            return
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid email or password" });
            return
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        const { password: _password, ...userWithoutPassword } = user;

        res.status(200).json({
            message: "Login successful",
            user: userWithoutPassword,
            token,
        });
        return
    } catch (err) {
        console.error("Signin Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
        return
    }
};
