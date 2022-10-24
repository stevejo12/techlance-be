import postgresDB from "../configs/db.config";
import { QueryReponseModel } from "../models/response.model";

const queryWithParams = (sql: string, params: Array<string>): Promise<QueryReponseModel> => {
  return new Promise((resolve, reject) => {
    postgresDB.query(sql, params, (err, res) => {
      if (err) {
        return resolve({ 
          success: false, 
          message: err.message,
          data: res || []
        });
      } else {
        return resolve({ 
          success: true, 
          message: `Query has been successfully executed`,
          data: res
        });
      }
    })
  })
}

export default { queryWithParams };