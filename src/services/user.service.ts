import { QueryReponseModel } from "../models/response.model";
import postgresDB from "./db.service";
import { newUser } from "../models/user.model";

// edit response here with {success: true/false & message: ""} object only
// code 201,500,400 only handled in controller

const InsertUser = async (formData: newUser): Promise<QueryReponseModel> => {
  // generate created date/time
  const newDate: string = new Date().toDateString();
  // query into database
  const response = await postgresDB.queryWithParams(
    `INSERT INTO users(email, password, created_at) VALUES ($1,$2,$3) RETURNING *`,
    [formData.email, formData.password, newDate]
  );

  return response;
}

const LoginUserByEmail = async (formData: newUser): Promise<QueryReponseModel> => {
  const response = await postgresDB.queryWithParams(
    `SELECT * FROM users WHERE email = $1`, [formData.email]
  );

  return response;
};

export default { InsertUser, LoginUserByEmail };