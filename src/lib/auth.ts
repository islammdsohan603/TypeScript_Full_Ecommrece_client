import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';

const mongoUri = process.env.MONGO_DB_URI;

if (!mongoUri) {
  throw new Error(
    '❌ MONGO_DB_URI is not defined in your environment variables.',
  );
}

const client = new MongoClient(mongoUri);
const db = client.db('ecommareseUser');

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
