"use client";

import {UserType} from "@/server/models/user";
import {Button} from "@mui/material";
import {useCallback, useState} from "react";
import {EssetionalAddOutline} from "react-icons-sax";
import AddNewChatDialog from "./AddNewChatDialog";

type Props = {
  users: Array<UserType>;
};
export default function AddNewChat({users}: Props) {
  const [openAddChat, setOpenAddChat] = useState(false);
  const onOpenAddChat = useCallback(() => {
    setOpenAddChat(true);
  }, []);
  return (
    <div>
      <Button
        startIcon={<EssetionalAddOutline />}
        color="inherit"
        className="p-2"
        onClick={onOpenAddChat}>
        New Chat
      </Button>
      <AddNewChatDialog open={openAddChat} setOpen={setOpenAddChat} users={users} />
    </div>
  );
}
