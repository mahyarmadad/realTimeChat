import mongoose from "mongoose";
import {InferSchemaType} from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkID: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    clerkImageUrl: {type: String, required: false},
    bio: {type: String, required: false},
  },
  {timestamps: true},
);
type User = InferSchemaType<typeof userSchema> & Document;

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;
export type {User as UserType};
