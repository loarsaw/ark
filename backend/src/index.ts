import express, { json, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes";
import cors from 'cors'
dotenv.config();
const app = express();
app.use(json())
app.use(cors({
  origin: "*"
}))
const PORT = process.env.PORT;

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

app.use("/api", router)
app.listen(PORT, () => {
  console.log("Serever running at PORT: ", PORT);
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});