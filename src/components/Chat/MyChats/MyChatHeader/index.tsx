import {getAllUsers} from "@/server/functions/user";
import {Typography} from "@mui/material";
import AddNewChat from "../AddNewChat";

export default async function MyChatHeader() {
  const users = await getAllUsers();
  return (
    <div className="flex-center justify-between p-2">
      <Typography>My Chats</Typography>
      <AddNewChat users={users} />
    </div>
  );
}
