"use client";

import {selectedChatAtom} from "@/recoil/chat";
import {userRecoilAtom} from "@/recoil/user";
import {UserType} from "@/server/models/user";
import {Typography} from "@mui/material";
import {useCallback, useMemo} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import MessageArea from "./MessageArea";
import RecipientHeader from "./RecipientHeader";
import MessageInput from "./MessageInput";

export default function ChatArea() {
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatAtom);
  const user = useRecoilValue(userRecoilAtom);

  const recipient = useMemo<UserType | undefined>(
    () =>
      selectedChat?.users.find((item) => String(item?._id) !== user?._id) as UserType | undefined,
    [selectedChat, user?._id],
  );

  const onBackClick = useCallback(() => {
    setSelectedChat(null);
  }, [setSelectedChat]);

  return selectedChat ? (
    <div>
      <RecipientHeader recipient={recipient} onBackClick={onBackClick} />
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
