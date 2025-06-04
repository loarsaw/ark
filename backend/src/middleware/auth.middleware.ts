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
        console.log(decoded, "helo" , token , "tokeb")

        if (decoded && typeof decoded === "object" && "email" in decoded) {
            req.body.email = decoded.email;
            next();
        } else {
            res.status(403).json({ error: "Token verification failed." });
            return
        }
    });
};

export default verifyAuth;
