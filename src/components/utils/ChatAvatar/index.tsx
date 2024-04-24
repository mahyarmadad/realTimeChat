import {getImageFromDatabase} from "@/server/functions/image";
import {ChatType} from "@/server/models/chat";
import {Avatar, AvatarProps, CircularProgress} from "@mui/material";
import {useSnackbar} from "notistack";
import {useEffect, useState} from "react";

type Props = {
  selectedChat: ChatType;
  userImage: string;
} & AvatarProps;

export default function ChatAvatar({selectedChat, userImage, ...props}: Props) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    if (!selectedChat) return;
    if (!selectedChat?.isGroupChat) {
      setImageSrc(userImage);
    } else {
      if (selectedChat.groupProfilePicture) {
        setLoading(true);
        getImageFromDatabase(selectedChat.groupProfilePicture)
          .then((data: string) => {
            setImageSrc(data);
          })
          .catch((e) => enqueueSnackbar(e.message, {variant: "error"}))
          .finally(() => setLoading(false));
      }
    }
  }, [enqueueSnackbar, selectedChat, userImage]);

  return <div>{loading ? <CircularProgress /> : <Avatar src={imageSrc} {...props} />}</div>;
}
