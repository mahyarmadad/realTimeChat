import mongoose from "mongoose";
import {InferSchemaType} from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chat: {type: mongoose.Schema.Types.ObjectId, ref: "chats", required: true},
    sender: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},
    text: {type: String},
    image: {type: String},
    readBy: {type: [mongoose.Schema.Types.ObjectId], ref: "users", default: []},
  },
  {timestamps: true},
);
type Message = InferSchemaType<typeof messageSchema> & {_id: string} & Document;

const MessageModel = mongoose.models?.["messages"] ?? mongoose.model("messages", messageSchema);
export default MessageModel;
export type {Message as MessageType};
