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

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await UserService.LoginUserByEmail(req.body);
  } catch(err) {
    console.error(`Error while trying to log in user`);
    next(err);
  }
}

export default {registerUser, loginUser}