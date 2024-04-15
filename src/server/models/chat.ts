import mongoose from "mongoose";
import {InferSchemaType} from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    users: {type: [mongoose.Schema.Types.ObjectId], ref: "users"},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "users"},
    lastMessage: {type: mongoose.Schema.Types.ObjectId, ref: "messages"},
    isGroupChat: {type: Boolean, default: false},
    groupName: {type: String},
    groupProfilePicture: {type: String},
    groupBio: {type: String},
    groupAdmins: {type: [mongoose.Schema.Types.ObjectId], ref: "users"},
    unreads: {type: Object},
  },
  {timestamps: true},
);
type Chat = InferSchemaType<typeof chatSchema> & { _id: string } & Document;

const ChatModel = mongoose.models?.["chats"] ?? mongoose.model("chats", chatSchema);
export default ChatModel;
export type {Chat as ChatType};
