import {currentUser} from "@clerk/nextjs";
import UserModel from "../models/user";
import connectToMongoDB from "./database";
require("../models/message");
require("../models/chat");

connectToMongoDB();

export async function getUserFromMongoDB() {
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
    console.error("error getUserFromMongoDB:", error);
    return null;
  }
}
export async function updateUserProfileImage(userId: string, profileImageUrl: string) {
  try {
    const filter = {clerkID: userId};
    const update = {clerkImageUrl: profileImageUrl};
    await UserModel.findOneAndUpdate(filter, update, {new: true});
    console.info("User profile image updated successfully");
  } catch (error) {
    console.error("Error updating user profile image:", error);
  }
}

export async function getAllUsers() {
  try {
    const users = await UserModel.find({});
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    throw error;
  }
}
