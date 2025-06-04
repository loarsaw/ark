import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: "Access denied. No token provided." });
        return
    }

    jwt.verify(token, process.env.JWT_SECRET ?? "", (err, decoded) => {
        if (err) {
            res.status(403).json({ error: "Invalid token." });
            return
        }
        console.log(req.body, "helo")

        if (decoded && typeof decoded === "object" && "username" in decoded) {
            req.body.username = decoded.username;
            next();
        } else {
            res.status(403).json({ error: "Token verification failed." });
            return
        }
    });
};

export default verifyAuth;
