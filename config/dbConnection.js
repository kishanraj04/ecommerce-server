import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Ensure the environment variables are loaded

(async () => {
  try {
    const connection = await mongoose.connect(process.env.connectionURI);
    console.log('Connected to MongoDB:', connection.connection.host);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
})();
