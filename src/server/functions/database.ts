import mongoose from "mongoose";

export default async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB Connected");
  } catch (error) {
    throw error;
  }
}
