"use server";

import ChatModel from "../models/chat";
import MessageModel from "../models/message";

export async function sendNewMessage(payload: any) {
  try {
    const saveMessage = await MessageModel.create(payload);
    const existChat = await ChatModel.findById(payload.chat);
    const unreadCounts = existChat?.unreads;
    existChat?.users.forEach((user: string) => {
      if (user !== payload.sender) {
        unreadCounts[user] = (unreadCounts[user] || 0) + 1;
      }
    });
    await ChatModel.findOneAndUpdate(
      {_id: payload.chat},
      {
        lastMessage: saveMessage._id,
        unreads: unreadCounts,
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

export async function readAllMessages(cahatId: string, userId: string) {
  try {
    await MessageModel.updateMany(
      {
        chat: cahatId,
        sender: {$ne: userId},
        readBy: {
          $nin: [userId],
        },
      },
      {
        $addToSet: {readBy: userId},
      },
    );
    const existChat = await ChatModel.findById(cahatId);
    const unreadCounts = existChat?.unreads;
    const newUnreadCounts = {...unreadCounts, [userId]: 0};
    await ChatModel.findByIdAndUpdate(cahatId, {
      unreads: newUnreadCounts,
    });
  } catch (error) {
    throw error;
  }
}
