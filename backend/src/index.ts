import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { healthRouter } from "./routes/health";
import { musicRouter } from "./routes/music";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/health", healthRouter);
app.use("/music", musicRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
