import mongoose from 'mongoose';

const DB_URI = Deno.env.get("MONGO_URI") || 'mongodb://127.0.0.1:27017/shorturl';

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(DB_URI);
    console.log('Successfully connected to database');
  } catch (_error) {
    throw new Error('Error while connecting to Database');
  }
}
