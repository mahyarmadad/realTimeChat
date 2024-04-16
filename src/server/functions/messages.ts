"use server";

import ChatModel from "../models/chat";
import MessageModel from "../models/message";

export async function sendNewMessage(payload: any) {
  try {
    const saveMessage = await MessageModel.create(payload);
    await ChatModel.findOneAndUpdate(
      {_id: payload.chat},
      {
        lastMessage: saveMessage._id,
      },
    );
    return JSON.parse(JSON.stringify(saveMessage));
  } catch (error) {
    throw error;
  }
}

export async function getChatMessages(cahatId: string) {
  try {
    const messages = await MessageModel.find({chat: cahatId})
      .populate("sender")
      .sort({creadetAt: 1});
    return JSON.parse(JSON.stringify(messages));
  } catch (error) {
    throw error;
  }
}
