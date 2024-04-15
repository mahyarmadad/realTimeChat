"use client";

import {userRecoilAtom} from "@/recoil/user";
import {ChatType} from "@/server/models/chat";
import {UserType} from "@/server/models/user";
import {Avatar, ListItemButton, Typography} from "@mui/material";
import {useMemo} from "react";
import {useRecoilValue} from "recoil";

type Props = {
  chat: ChatType;
};

export default function ChatItem({chat, ...props}: Props) {
  const user = useRecoilValue(userRecoilAtom);

  const chatInfo = useMemo(() => {
    let name, image;
    if (chat.isGroupChat) {
      name = chat.groupName;
      image = chat.groupProfilePicture;
    } else {
      const recepient = chat.users.find((item) => String(item?._id) !== user?._id) as
        | UserType
        | undefined;
      name = recepient?.username;
      image = recepient?.clerkImageUrl;
    }
    return {name, image};
  }, [chat, user]);

  const lastMsg = useMemo(() => "", []);
  const lastMsgSender = useMemo(() => "", []);
  const lastMsgTime = useMemo(() => "", []);
  return (
    <ListItemButton {...props}>
      <Avatar src={chatInfo.image || undefined} className="mr-2" />
      <Typography>{chatInfo.name}</Typography>
    </ListItemButton>
  );
}
