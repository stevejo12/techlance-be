import { QueryResult } from "pg"

export interface QueryReponseModel {
  success: boolean,
  message: string,
  data: QueryResult
}

export interface ReturnResponseModel {
  code: number,
  message: string,
  data: Object
}