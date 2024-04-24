import {DialogContainer} from "@/components/utils";
import {chatListAtom, editGroupChatAtom} from "@/recoil/chat";
import {userRecoilAtom} from "@/recoil/user";
import {createNewChat, updateChat} from "@/server/functions/chats";
import {addImageToDatabase, getImageFromDatabase} from "@/server/functions/image";
import {UserType} from "@/server/models/user";
import {LoadingButton} from "@mui/lab";
import {
  Avatar,
  Button,
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import {useSnackbar} from "notistack";
import {ChangeEvent, useCallback, useEffect, useMemo, useState} from "react";
import {ContentEditDocumentUploadLinear, EssetionalCloseCircleLinear} from "react-icons-sax";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";

type Props = {
  open: boolean;
  setOpen: Function;
  users: Array<UserType>;
};

type GroupInfo = {
  groupName: string;
  groupBio: string;
  groupPhoto: File | null;
  groupUsers: string[];
};

export default function AddNewGroupChatDialog({open, setOpen, users}: Props) {
  const [loading, setLoading] = useState(false);
  const [groupInfo, setGroupInfo] = useState<GroupInfo>({
    groupName: "",
    groupBio: "",
    groupPhoto: null,
    groupUsers: [],
  });
  const user = useRecoilValue(userRecoilAtom);
  const setChatList = useSetRecoilState(chatListAtom);
  const [editGroupChat, setEditGroupChat] = useRecoilState(editGroupChatAtom);

  const disabledButton = useMemo(
    () => !groupInfo.groupName.trim() || !groupInfo.groupBio.trim() || !groupInfo.groupUsers.length,
    [groupInfo],
  );

  const onClose = useCallback(() => {
    setEditGroupChat(null);
    setOpen(false);
  }, [setEditGroupChat, setOpen]);

  const showList = useMemo(
    () => (users?.length ? users.filter((item) => item._id !== user?._id) : []),
    [users, user],
  );

  const {enqueueSnackbar} = useSnackbar();

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setGroupInfo((prev) => ({...prev, [name]: value}));
  }, []);

  const onFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const file = e.target.files?.[0];
    if (file) setGroupInfo((prev) => ({...prev, [name]: file}));
  }, []);

  const onUserChange = useCallback(
    (userId: string) => () => {
      setGroupInfo((prev) => {
        let cache = {...prev};
        let chacheUser: string[] = [...cache.groupUsers];
        const exist = chacheUser.includes(userId);
        if (exist) chacheUser = chacheUser.filter((item) => item !== userId);
        else chacheUser.push(userId);
        cache.groupUsers = chacheUser;
        return cache;
      });
    },
    [],
  );

  const onAddGroup = useCallback(async () => {
    try {
      setLoading(true);
      let payload = {
        users: [...groupInfo.groupUsers, user?._id],
        createdBy: user?._id,
        isGroupChat: true,
        groupName: groupInfo.groupName,
        groupProfilePicture: groupInfo.groupPhoto,
        groupBio: groupInfo.groupBio,
        groupAdmins: [user?._id],
      };
      if (groupInfo.groupPhoto && typeof groupInfo.groupPhoto !== "string") {
        const buffer = await groupInfo.groupPhoto.arrayBuffer();
        const groupImage = await addImageToDatabase({
          image: Buffer.from(buffer),
          contentType: groupInfo.groupPhoto.type,
        });
        payload = {...payload, groupProfilePicture: groupImage._id};
      }
      if (editGroupChat) {
        const updatedChat = await updateChat(editGroupChat._id, payload);
        setChatList((prev) => {
          let cache = [...prev];
          cache = cache.filter((item) => item._id === updatedChat._id);
          cache.push(updatedChat);
        });
        enqueueSnackbar("Group Chat updated successfully", {variant: "success"});
      } else {
        const newChats = await createNewChat(payload);
        setChatList(newChats);
        enqueueSnackbar("Group Chat created successfully", {variant: "success"});
      }
      onClose();
    } catch (error: any) {
      enqueueSnackbar(error.message, {variant: "error"});
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar, groupInfo, onClose, setChatList, user?._id, editGroupChat]);

  useEffect(() => {
    if (!editGroupChat) return;
    setGroupInfo({
      groupName: editGroupChat.groupName,
      groupBio: editGroupChat.groupBio,
      groupUsers: editGroupChat.users.map((item) => item._id),
    });
    if (editGroupChat.groupProfilePicture) {
      getImageFromDatabase(editGroupChat.groupProfilePicture).then((data) => {
        setGroupInfo((prev) => ({...prev, groupPhoto: data}));
      });
    }
  }, [editGroupChat]);
  return (
    <DialogContainer open={open} fullScreen>
      <div className="flex flex-col p-4 h-full">
        <div className="center relative">
          <Typography>Create Group Chat</Typography>
          <IconButton className="absolute right-2" onClick={onClose}>
            <EssetionalCloseCircleLinear />
          </IconButton>
        </div>
        <div className="grid grid-cols-[0.5fr_1fr] gap-4 mt-4 grow">
          <div className="max-h-full overflow-auto">
            {showList.length ? (
              <div className="flex flex-col gap-2 mt-4">
                {showList.map((user) => (
                  <ListItem
                    key={user._id}
                    secondaryAction={
                      <Checkbox
                        checked={groupInfo.groupUsers.indexOf(user._id) !== -1}
                        tabIndex={-1}
                        disableRipple
                      />
                    }
                    disablePadding>
                    <ListItemButton
                      className="bg-gray-800/40 rounded-lg"
                      onClick={onUserChange(user._id)}>
                      <Avatar alt={`user avatar`} src={`${user.clerkImageUrl}`} className="mr-2" />
                      <ListItemText primary={user.username} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </div>
            ) : (
              <div className="center my-20">
                <Typography>No User Found</Typography>
              </div>
            )}
          </div>
          <div className="flex-center flex-col">
            <div className="flex flex-col gap-4 max-w-md w-full">
              <TextField
                label="Group Name"
                value={groupInfo.groupName}
                onChange={onChange}
                name="groupName"
                fullWidth
              />
              <TextField
                label="Group Description"
                value={groupInfo.groupBio}
                onChange={onChange}
                name="groupBio"
                fullWidth
                multiline
              />
              <div
                className={`bg-cover bg-center ${groupInfo.groupPhoto ? "center h-24" : ""}`}
                style={{
                  backgroundImage: groupInfo.groupPhoto
                    ? `url(${
                        typeof groupInfo.groupPhoto === "string"
                          ? groupInfo.groupPhoto
                          : URL.createObjectURL(groupInfo.groupPhoto)
                      })`
                    : "none",
                }}>
                <Button
                  component="label"
                  role={undefined}
                  variant="outlined"
                  color="secondary"
                  tabIndex={-1}
                  startIcon={<ContentEditDocumentUploadLinear />}
                  fullWidth>
                  Upload file
                  <input type="file" hidden name="groupPhoto" onChange={onFileChange} />
                </Button>
              </div>

              <LoadingButton
                onClick={onAddGroup}
                variant="contained"
                loading={loading}
                disabled={disabledButton}
                className="mt-6">
                {editGroupChat ? "update" : "Create"}
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    </DialogContainer>
  );
}
