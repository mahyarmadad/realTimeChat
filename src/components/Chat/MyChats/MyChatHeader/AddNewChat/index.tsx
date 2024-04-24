"use client";

import {UserType} from "@/server/models/user";
import {Button, Menu, MenuItem} from "@mui/material";
import {MouseEvent, useCallback, useState} from "react";
import {EssetionalAddOutline} from "react-icons-sax";
import AddNewChatDialog from "./AddNewChatDialog";
import AddNewGroupChatDialog from "./AddNewGroupChatDialog";
import {useRecoilState} from "recoil";
import {openAddEditGroupChatAtom} from "@/recoil/chat";

type Props = {
  users: Array<UserType>;
};
export default function AddNewChat({users}: Props) {
  const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null);
  const [openAddChat, setOpenAddChat] = useState(false);
  const [openAddGroupChat, setOpenAddGroupChat] = useRecoilState(openAddEditGroupChatAtom);

  const onOpenAddChat = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    setOpenMenu(e.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setOpenMenu(null);
  }, []);

  const onNewChat = useCallback(() => {
    setOpenAddChat(true);
    handleClose();
  }, [handleClose]);

  const onNewGroupChat = useCallback(() => {
    setOpenAddGroupChat(true);
    handleClose();
  }, [handleClose, setOpenAddGroupChat]);

  return (
    <div>
      <Button
        startIcon={<EssetionalAddOutline />}
        color="inherit"
        className="p-2"
        onClick={onOpenAddChat}>
        New Chat
      </Button>
      <Menu anchorEl={openMenu} open={Boolean(openMenu)} onClose={handleClose}>
        <MenuItem onClick={onNewChat}>New Chat</MenuItem>
        <MenuItem onClick={onNewGroupChat}>New Group Chat</MenuItem>
      </Menu>

      <AddNewChatDialog open={openAddChat} setOpen={setOpenAddChat} users={users} />
      <AddNewGroupChatDialog open={openAddGroupChat} setOpen={setOpenAddGroupChat} users={users} />
    </div>
  );
}
