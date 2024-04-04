import {Typography} from "@mui/material";
import AddNewChat from "./AddNewChat";

export default function ChatList() {
  return (
    <div className="flex-center justify-between p-2">
      <Typography>My Chats</Typography>

      <AddNewChat />
    </div>
  );
}
