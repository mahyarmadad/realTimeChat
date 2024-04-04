import mongoose from "mongoose";

export default async function connectToMongoDB() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions,
    );
  } catch (error) {
    throw error;
  }
}
