import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer = null;

const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/akash_portfolio';
  
  try {
    // Attempt connecting to local/Atlas MongoDB service
    const conn = await mongoose.connect(primaryUri, { serverSelectionTimeoutMS: 2000 });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ Local MongoDB service not detected on port 27017 (${error.message}).`);
    console.log(`🚀 Launching In-Memory MongoDB Server...`);
    
    try {
      mongoMemoryServer = await MongoMemoryServer.create();
      const memoryUri = mongoMemoryServer.getUri();
      const conn = await mongoose.connect(memoryUri);
      console.log(`✅ MongoDB Connected (In-Memory DB Active): ${conn.connection.host}`);
    } catch (memError) {
      console.error(`❌ In-Memory MongoDB Error: ${memError.message}`);
    }
  }
};

export default connectDB;
