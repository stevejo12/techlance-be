import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { PORT } from "./configs/env.config";
import userRoutes from "./routes/v1/user.routes";

const port: number = parseInt(PORT as string, 10);
const app = express();
app.use(express.static("."));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  console.log("Hello World!");
});

app.use("/v1/user", userRoutes)

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
