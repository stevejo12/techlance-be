import { NextFunction, Request, Response } from "express"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserService from "../services/user.service";
import { ReturnResponseModel } from "../models/response.model";

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let returnResponse: ReturnResponseModel = {
      code: 500,
      message: "",
      data: {}
    };
    let data = JSON.parse(JSON.stringify(req.body));
    
    // hash-ing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword: string = await bcrypt.hash(req.body.password, salt);
    data.password = hashPassword;

    const response = await UserService.InsertUser(data);

    if (response.success) {
      returnResponse.code = 201;
      returnResponse.message= "Registration successful"
    } else {
      returnResponse.code = 500;
      returnResponse.message = response.message;
    }

    res.status(returnResponse.code).send(returnResponse);
  } catch(err) {
    console.error(`Error while creating a new user`, err);
    next(err);
  }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let returnResponse: ReturnResponseModel = {
      code: 500,
      message: "",
      data: {}
    };
    const response = await UserService.LoginUserByEmail(req.body);
    const dbPassword = response.data?.rows[0]?.password || "";

    const isPasswordCorrect = await bcrypt.compare(req.body.password, dbPassword)

    if (response.success) {
      if (isPasswordCorrect) {
        var token = jwt.sign(
          { id: req.body.id }, 
          process.env.JWT_TOKEN_SECRET || "", 
          { expiresIn: '1h' }
        );

        returnResponse.code = 201;
        returnResponse.message= "Login successful"
        returnResponse.data= {
          token: token
        }
      } else {
        returnResponse.code = 400;
        returnResponse.message= "Password is not correct"
      }
    } else {
      returnResponse.code = 500;
      returnResponse.message = response.message;
    }
    
    res.status(returnResponse.code).send(returnResponse);
  } catch(err) {
    console.error(`Error while trying to log in user`);
    next(err);
  }
}

export default {registerUser, loginUser}