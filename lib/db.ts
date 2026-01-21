import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {
  serverSelectionTimeoutMS: 5000,
};

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  const client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function getMongo() {
  const client = await clientPromise;
  const db = client.db();
  return { client, db };
}
