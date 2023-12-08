import { MongoClient } from "mongodb";

const connectionString = process.env.MONGODB_URI || "";

console.log(connectionString);

const client = new MongoClient(connectionString);

let conn;
try {
  console.log("Connecting to MongoDB CE...");
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("gamedaygrill");

export default db; 