"use client";

import {chatListAtom} from "@/recoil/chat";
import {userRecoilAtom} from "@/recoil/user";
import {getAllChats} from "@/server/functions/chats";
import {Typography} from "@mui/material";
import {useSnackbar} from "notistack";
import {useEffect} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import ChatItem from "./ChatItem";

export default function ChatList() {
  const [chatList, setChatList] = useRecoilState(chatListAtom);
  const user = useRecoilValue(userRecoilAtom);

  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    if (!user?._id) return;
    getAllChats(user?._id)
      .then((d) => setChatList(d))
      .catch((e) => enqueueSnackbar(e.message, {variant: "error"}));
  }, [enqueueSnackbar, setChatList, user]);
  return (
    <div className="flex flex-col gap-2">
      {chatList.length ? (
        chatList.map((item) => <ChatItem key={item._id} chat={item} />)
      ) : (
        <Typography align="center" color="textSecondary" className="my-4">
          No Chat Found
        </Typography>
      )}
    </div>
  );
}
