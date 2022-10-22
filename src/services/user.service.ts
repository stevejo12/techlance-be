import { QueryReponseModel } from "../models/response.model";
import postgresDB from "./db.service";
import { newUser } from "../models/user.model";

const InsertUser = async (formData: newUser): Promise<QueryReponseModel> => {
  const newDate: string = new Date().toDateString()
  const response = await postgresDB.queryWithParams(
    `INSERT INTO users(email, password, created_at) VALUES ($1,$2,$3) RETURNING *`,
    [formData.email, formData.password, newDate]
  );

  return response;
}

export default { InsertUser };