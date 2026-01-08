import { MongoClient } from "mongodb";


const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MongoDB URI is missing.")
}

const client = new MongoClient(uri);
const db = client.db();

export { db,client };
