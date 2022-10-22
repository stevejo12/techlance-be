// establish db connection here
import postgresDB from "../configs/db.config";
import { QueryReponseModel } from "../models/response.model";

const queryWithParams = (sql: string, params: Array<string>): Promise<QueryReponseModel> => {
  return new Promise((resolve, reject) => {
    postgresDB.query(sql, params, (err, res) => {
      if (err) {
        return resolve({ 
          code: 500, 
          message: "Error while inserting new user"
        });
      } else {
        return resolve({ 
          code: 201, 
          message: `user has been successfully added ${res.rows[0].id}`
        });
      }
    })
  })
}

export default { queryWithParams };