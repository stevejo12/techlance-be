import { Client } from "pg";
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from "./env.config";

const client = new Client({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: parseInt(DB_PORT as string, 10)
});

// establish connection
client
  .connect()
  .then(() => console.log("postgresql connected"))
  .catch(err => console.error("postgresql connection error: ", err));

// on error catch
client.on('error', err => {
  console.error('something bad has happened!', err.stack)
})

export default client;
