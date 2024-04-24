"use client";

import {selectedChatAtom} from "@/recoil/chat";
import {userRecoilAtom} from "@/recoil/user";
import {UserType} from "@/server/models/user";
import {Typography} from "@mui/material";
import {useCallback, useMemo, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import ChatInfoMenu from "./ChatInfoMenu";
import MessageArea from "./MessageArea";
import MessageInput from "./MessageInput";
import RecipientHeader from "./RecipientHeader";

export default function ChatArea() {
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatAtom);

  const onBackClick = useCallback(() => {
    setSelectedChat(null);
  }, [setSelectedChat]);

  return selectedChat ? (
    <div>
      <RecipientHeader
        selectedChat={selectedChat}
        onBackClick={onBackClick}
        setOpenMenu={setOpenMenu}
      />
      <ChatInfoMenu open={openMenu} setOpen={setOpenMenu} selectedChat={selectedChat} />
      <div className="overflow-auto h-[calc(100%-56px)] flex flex-col">
        <MessageArea />
        <MessageInput />
      </div>
    </div>
  ) : (
    <div className="center">
      <Typography color="textSecondary">Please select a chat</Typography>
    </div>
  );
}
