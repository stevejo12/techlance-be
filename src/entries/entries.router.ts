import express, { Request, Response } from "express";
import * as EntriesService from './entries.service';
import { NewUser } from "./entries.interface";

export const entriesRouter = express.Router();

entriesRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const formData: NewUser = req.body;

    const newUser = await EntriesService
  } catch(e) {
    res.status(500).send(e.message);
  }
})