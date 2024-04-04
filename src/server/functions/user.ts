import {currentUser} from "@clerk/nextjs";
import UserModel from "../models/user";
import connectToMongoDB from "./database";

connectToMongoDB();

export default async function getUserFromMongoDB() {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) return null;
    const mongoUser = await UserModel.findOne({clerkID: clerkUser?.id});
    if (mongoUser) return JSON.parse(JSON.stringify(mongoUser));
    const userData = {
      clerkID: clerkUser.id,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      username: clerkUser.username,
      clerkImageUrl: clerkUser.imageUrl,
    };
    const newMongoUser = await UserModel.create(userData);
    return JSON.parse(JSON.stringify(newMongoUser));
  } catch (error) {
    throw error;
  }
}
