import { NextFunction, Request, Response } from "express"
import UserService from "../services/user.service";

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await UserService.InsertUser(req.body);
    res.status(response.code).send(response.message);
  } catch(err) {
    console.error(`Error while creating a new user`, err);
    next(err);
  }
}

export default {registerUser}