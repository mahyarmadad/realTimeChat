"use client";

import {chatListAtom, selectedChatAtom} from "@/recoil/chat";
import {userRecoilAtom} from "@/recoil/user";
import {getAllChats} from "@/server/functions/chats";
import {CircularProgress, TextField, Typography} from "@mui/material";
import {useSnackbar} from "notistack";
import {useCallback, useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import ChatItem from "./ChatItem";
import {ChatType} from "@/server/models/chat";

export default function ChatList() {
  const [loading, setLoaing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [chatList, setChatList] = useRecoilState(chatListAtom);
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatAtom);
  const user = useRecoilValue(userRecoilAtom);

  const {enqueueSnackbar} = useSnackbar();

  const onChatClick = useCallback(
    (chat: ChatType) => () => {
      setSelectedChat(chat);
    },
    [setSelectedChat],
  );

  useEffect(() => {
    if (!user?._id) return;
    setLoaing(true);
    getAllChats(user?._id)
      .then((d) => setChatList(d))
      .catch((e) => enqueueSnackbar(e.message, {variant: "error"}))
      .finally(() => setLoaing(false));
  }, [enqueueSnackbar, setChatList, user]);
  return (
    <div>
      <div className="p-2">
        <TextField
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          fullWidth
          placeholder="Search..."
        />
      </div>

      <div className="flex flex-col gap-2">
        {loading ? (
          <div className="center my-4">
            <CircularProgress />
          </div>
        ) : chatList.length ? (
          chatList
            .filter((item) => item.users.find((u) => String(u._id) !== user?._id))
            .map((item) => (
              <ChatItem
                key={item._id}
                chat={item}
                lastMessage={item.lastMessage}
                onClick={onChatClick(item)}
                selected={item._id === selectedChat?._id}
              />
            ))
        ) : (
          <Typography align="center" color="textSecondary" className="my-4">
            No Chat Found
          </Typography>
        )}
      </div>
    </div>
  );
}
