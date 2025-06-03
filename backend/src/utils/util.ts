import jwt from "jsonwebtoken";
import "dotenv/config"
export async function generateVerificationLink(email: string) {
    const token = jwt.sign({ data: email }, process.env.JWT_SECRET ?? "", {
        expiresIn: "24h",
    });
    return token;
}

export const verifyToken = async (token: string): Promise<{ data: string }> => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "");
    return decoded as { data: string };
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};