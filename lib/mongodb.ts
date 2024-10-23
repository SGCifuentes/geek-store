import { MongoClient } from 'mongodb';

const url = process.env.MONGODB_URL as string;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URL) {
  throw new Error('Please add yout MongoDB URL to .env');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(url);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(url);
  clientPromise = client.connect();
}

export default clientPromise;
