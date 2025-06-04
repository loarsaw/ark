import { Request, Response } from "express";
import { getMongoDBInstance } from "../../../config/mongo";

export const getPublicProfile = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      res.status(400).json({ message: "Missing user ID" });
      return;
    }

    const db = await getMongoDBInstance();
    if (!db) {
      res.status(500).json({ message: "DB connection failed" });
      return;
    }

    const publicCollection = db.collection("public");

    const user = await publicCollection.findOne({ uid: uid });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error("Get Public Profile Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
