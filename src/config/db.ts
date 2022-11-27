import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn : any = await mongoose.connect(db, {
      // @ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
