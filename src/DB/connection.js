import mongoose from "mongoose";

export const database_connection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Database connected successfully.");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1); // Exit process if DB fails to connect
  }
};
