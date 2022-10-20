import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

dotenv.config();
console.log("aaa");
// if (!process.env.PORT) {
//   process.exit(1);
// }
const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  console.log("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
