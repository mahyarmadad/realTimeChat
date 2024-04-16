"use client";

import {formatTimeDate} from "@/functions/date";
import {userRecoilAtom} from "@/recoil/user";
import {getImageFromDatabase} from "@/server/functions/image";
import {ChatType} from "@/server/models/chat";
import {MessageType} from "@/server/models/message";
import {UserType} from "@/server/models/user";
import {Avatar, Badge, ListItemButton, ListItemButtonProps, Typography} from "@mui/material";
import {useMemo} from "react";
import {useRecoilValue} from "recoil";

type Props = {
  chat: ChatType;
  lastMessage: MessageType | undefined;
} & ListItemButtonProps;

export default function ChatItem({chat, lastMessage, ...props}: Props) {
  const user = useRecoilValue(userRecoilAtom);

  const chatInfo = useMemo(() => {
    let name, image;
    if (chat.isGroupChat) {
      name = chat.groupName;
      if (chat.groupProfilePicture)
        getImageFromDatabase(chat.groupProfilePicture).then((data) => (image = data));
    } else {
      const recipient = chat.users.find((item) => String(item?._id) !== user?._id) as
        | UserType
        | undefined;
      name = recipient?.username;
      image = recipient?.clerkImageUrl;
    }
    return {name, image};
  }, [chat, user]);

  const lastMessageInfo = useMemo(() => {
    let lastMsgText, lastMsgTime;
    if (lastMessage) {
      lastMsgText = lastMessage.text;
      // lastMsgSender =
      //   String(lastMessage?.sender._id) === user?._id ? "You" : lastMessage.sender.username;
      lastMsgTime = formatTimeDate(lastMessage.createdAt);
    }
    return {
      lastMsgText,
      // lastMsgSender,
      lastMsgTime,
    };
  }, [lastMessage]);

  const unreadCount = useMemo(
    () => (user?._id ? chat.unreads?.[user?._id] || 0 : 0),
    [chat.unreads, user?._id],
  );

  return (
    <ListItemButton {...props}>
      <Avatar src={chatInfo.image || undefined} className="mr-2" />
      <div className="w-full">
        <div className="flex-center gap-2">
          <Typography className="grow">{chatInfo.name}</Typography>
          <Typography variant="caption">{lastMessageInfo.lastMsgTime}</Typography>
        </div>
        <div className="flex-center gap-2">
          <Typography variant="caption" className="grow truncate">
            {lastMessageInfo.lastMsgText}
          </Typography>
          <Badge badgeContent={unreadCount} color="info" />
          {/* <Typography variant="caption">{lastMessageInfo.lastMsgSender}</Typography> */}
        </div>
      </div>
    </ListItemButton>
  );
}
