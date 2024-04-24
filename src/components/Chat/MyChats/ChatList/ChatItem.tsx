"use client";

import ChatAvatar from "@/components/utils/ChatAvatar";
import {formatTimeDate} from "@/functions/date";
import {userRecoilAtom} from "@/recoil/user";
import {ChatType} from "@/server/models/chat";
import {MessageType} from "@/server/models/message";
import {UserType} from "@/server/models/user";
import {Badge, ListItemButton, ListItemButtonProps, Typography} from "@mui/material";
import {useMemo} from "react";
import {useRecoilValue} from "recoil";

type Props = {
  chat: ChatType;
  lastMessage: MessageType | undefined;
} & ListItemButtonProps;

export default function ChatItem({chat, lastMessage, ...props}: Props) {
  const user = useRecoilValue(userRecoilAtom);

  const recipient = useMemo(
    () => chat.users.find((item) => String(item?._id) !== user?._id) as UserType | undefined,
    [chat.users, user?._id],
  );
  const chatName = useMemo(
    () => (chat.isGroupChat ? chat.groupName : recipient?.username),
    [chat.groupName, chat.isGroupChat, recipient?.username],
  );

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
      <ChatAvatar selectedChat={chat} userImage={recipient?.clerkImageUrl || ""} className="mr-2" />
      <div className="w-full">
        <div className="flex-center gap-2">
          <Typography className="grow">{chatName}</Typography>
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
