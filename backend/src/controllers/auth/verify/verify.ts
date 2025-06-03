import { Request, Response } from "express";
import { getMongoDBInstance } from "../../../config/mongo";
import { verifyToken } from "../../../utils/util";

export const verify = async (req: Request, res: Response) => {
  const { token } = req.body;
  console.log(token, "token");

  if (!token) {
    res.status(400).json({ msg: "Token not provided" });
    return;
  }

  try {
    const payload = await verifyToken(token);

    if (!payload?.data) {
      res.status(400).json({ msg: "Invalid token payload" });
      return;
    }

    const email = payload.data;

    const db = await getMongoDBInstance();  
    const publicCollection = db.collection("public");

    const updateResult = await publicCollection.updateOne(
      { email },
      { $set: { isVerified: true } }
    );

    if (updateResult.modifiedCount === 0) {
      res.status(404).json({ msg: "User not found or already verified" });
      return;
    }

    res.status(200).json({ msg: "Email verified successfully" });
    return;
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ msg: "Internal server error" });
    return;
  }
};
