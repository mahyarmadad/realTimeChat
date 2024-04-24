import {DialogContainer} from "@/components/utils";
import {chatListAtom} from "@/recoil/chat";
import {userRecoilAtom} from "@/recoil/user";
import {createNewChat} from "@/server/functions/chats";
import {UserType} from "@/server/models/user";
import {
  Avatar,
  CircularProgress,
  IconButton,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import {useSnackbar} from "notistack";
import {useCallback, useMemo, useState} from "react";
import {EssetionalCloseCircleLinear} from "react-icons-sax";
import {useRecoilState, useRecoilValue} from "recoil";

type Props = {
  open: boolean;
  setOpen: Function;
  users: Array<UserType>;
};
export default function AddNewChatDialog({open, setOpen, users}: Props) {
  const [loading, setLoading] = useState<any>(false);
  const user = useRecoilValue(userRecoilAtom);
  const [chatList, setChatList] = useRecoilState(chatListAtom);

  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const showList = useMemo(
    () =>
      users?.length
        ? users.filter(
            (item) =>
              item._id !== user?._id &&
              !chatList?.some((chat) => chat.users.find((cu) => String(cu._id) === item._id)),
          )
        : [],
    [users, chatList, user],
  );

  const {enqueueSnackbar} = useSnackbar();

  const onAddChat = useCallback(
    (userId: string) => async () => {
      try {
        setLoading(userId);
        const newChats = await createNewChat({
          users: [userId, user?._id],
          createdBy: user?._id,
          isGroupChat: false,
        });
        setChatList(newChats);
        enqueueSnackbar("Chat created successfully", {variant: "success"});
      } catch (error: any) {
        enqueueSnackbar(error.message, {variant: "error"});
      } finally {
        setLoading(false);
      }
    },
    [enqueueSnackbar, setChatList, user],
  );

  return (
    <DialogContainer open={open} classes={{paper: "w-full"}}>
      <div className="p-4 w-full">
        <div className="center relative">
          <Typography>Create New Chat</Typography>
          <IconButton className="absolute right-2" onClick={onClose}>
            <EssetionalCloseCircleLinear />
          </IconButton>
        </div>
        {showList.length ? (
          <div className="flex flex-col gap-2 mt-4">
            {showList.map((user) => (
              <ListItemButton
                key={user._id}
                className="bg-gray-800/40 rounded-lg"
                onClick={onAddChat(user._id)}
                disabled={Boolean(loading)}>
                <Avatar alt={`user avatar`} src={`${user.clerkImageUrl}`} className="mr-2" />
                <ListItemText primary={user.username} />
                {loading === user._id ? <CircularProgress size={15} /> : null}
              </ListItemButton>
            ))}
          </div>
        ) : (
          <div className="center my-20">
            <Typography>No User Found</Typography>
          </div>
        )}
      </div>
    </DialogContainer>
  );
}
