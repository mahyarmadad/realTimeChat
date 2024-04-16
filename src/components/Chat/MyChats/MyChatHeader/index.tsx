import {getAllUsers} from "@/server/functions/user";
import {Typography} from "@mui/material";
import AddNewChat from "../AddNewChat";

export default async function MyChatHeader() {
  const users = await getAllUsers();
  return (
    <div className="flex-center justify-between py-2 px-4 h-14 border-slate-900 border-0 border-b border-solid">
      <Typography>My Chats</Typography>
      <AddNewChat users={users} />
    </div>
  );
}
