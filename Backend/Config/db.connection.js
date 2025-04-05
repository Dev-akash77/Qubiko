import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Database connection error:", error);
  }
};
  