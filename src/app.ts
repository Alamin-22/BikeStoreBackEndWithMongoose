import express, { Request, Response } from "express";
import cors from "cors";
const app = express();

// parser Start

app.use(express.json());
app.use(cors());

// parser End

app.get("/", (req: Request, res: Response) => {
  res.send("Bike Store Server Is Running ");
});

export default app;
