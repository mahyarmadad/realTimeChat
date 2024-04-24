import ChatAvatar from "@/components/utils/ChatAvatar";
import {editGroupChatAtom, openAddEditGroupChatAtom} from "@/recoil/chat";
import {userRecoilAtom} from "@/recoil/user";
import {ChatType} from "@/server/models/chat";
import {UserType} from "@/server/models/user";
import {Close, Edit} from "@mui/icons-material";
import {Avatar, IconButton, ListItem, SwipeableDrawer, Typography} from "@mui/material";
import {useCallback, useMemo} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  selectedChat: ChatType;
};

export default function ChatInfoMenu({open, setOpen, selectedChat}: Props) {
  const user = useRecoilValue(userRecoilAtom);
  const setOpenAddGroupChat = useSetRecoilState(openAddEditGroupChatAtom);
  const setEditGroupChat = useSetRecoilState(editGroupChatAtom);

  const recipient = useMemo(
    () =>
      selectedChat.isGroupChat
        ? undefined
        : (selectedChat?.users.find((item) => String(item?._id) !== user?._id) as
            | UserType
            | undefined),
    [selectedChat, user?._id],
  );
  const chatName = useMemo(
    () => (selectedChat?.isGroupChat ? selectedChat.groupName : recipient?.username),
    [recipient, selectedChat],
  );

  const isEditable = useMemo(
    () => (selectedChat?.isGroupChat ? selectedChat.createdBy === user?._id : false),
    [selectedChat, user],
  );
  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onOpenEditChat = useCallback(() => {
    setEditGroupChat(selectedChat);
    setOpenAddGroupChat(true);
    onClose();
  }, [onClose, selectedChat, setEditGroupChat, setOpenAddGroupChat]);

  return (
    <SwipeableDrawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      onOpen={() => setOpen(true)}
      classes={{paper: "rounded-none"}}>
      <div>
        <div className="flex-center justify-between">
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
          {isEditable ? (
            <IconButton onClick={onOpenEditChat}>
              <Edit />
            </IconButton>
          ) : null}
        </div>

        <div className="p-6 ">
          <div className="center">
            <ChatAvatar
              selectedChat={selectedChat}
              userImage={recipient?.clerkImageUrl}
              sx={{width: 72, height: 72}}
            />
            <Typography className="mt-4">{chatName}</Typography>
          </div>
          <div className="flex flex-col mt-6">
            <Typography>Created On:</Typography>
            <Typography>{new Date(selectedChat.createdAt).toLocaleDateString()}</Typography>
          </div>

          {selectedChat?.isGroupChat ? (
            <div className="mt-4">
              <Typography color="textSecondary" variant="body2">
                {selectedChat.users.length} Member
              </Typography>
              <div className="flex flex-col gap-2 mt-3">
                {selectedChat.users.map((groupUser) => (
                  <ListItem key={groupUser.clerkID} disableGutters disablePadding>
                    <Avatar src={groupUser.clerkImageUrl || ""} className="mr-2" />
                    <Typography>{groupUser.username}</Typography>
                  </ListItem>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </SwipeableDrawer>
  );
}
