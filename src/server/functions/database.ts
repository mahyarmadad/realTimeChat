import mongoose from "mongoose";

export default async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.info("MongoDB Connected");
  } catch (error: any) {
    console.error("MongoDB Connect", error.message);
  }
}
