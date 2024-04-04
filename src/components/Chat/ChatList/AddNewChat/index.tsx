"use client";

import {Button} from "@mui/material";
import {useCallback, useState} from "react";
import {EssetionalAddOutline} from "react-icons-sax";
import AddNewChatDialog from "../AddNewChatDialog";

export default function AddNewChat() {
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
      <AddNewChatDialog open={openAddChat} setOpen={setOpenAddChat} />
    </div>
  );
}
