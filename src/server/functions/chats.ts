"use server";

import ChatModel from "../models/chat";

export async function createNewChat(payload: any) {
  try {
    await ChatModel.create(payload);
    const newChats = await ChatModel.find({
      users: {
        $in: [payload.createdBy],
      },
    })
      .populate("users")
      .sort({updatedAt: -1});
    return JSON.parse(JSON.stringify(newChats));
  } catch (error) {
    throw error;
  }
}

export async function getAllChats(userId: string) {
  try {
    const chats = await ChatModel.find({
      users: {
        $in: [userId],
      },
    }).populate("users");
    // const chats = await ChatModel.find({
    //   createdBy: userId,
    // });
    return JSON.parse(JSON.stringify(chats));
  } catch (error) {
    throw error;
  }
}
