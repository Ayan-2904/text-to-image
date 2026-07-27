import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("✅ MongoDB Connected");
    console.log(`📂 Database : ${conn.connection.name}`);
    console.log(`🌍 Host      : ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);
  }
};

export default connectDB;