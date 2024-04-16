import {selectedChatAtom} from "@/recoil/chat";
import {userRecoilAtom} from "@/recoil/user";
import {getChatMessages} from "@/server/functions/messages";
import {MessageType} from "@/server/models/message";
import {CircularProgress, Typography} from "@mui/material";
import {useSnackbar} from "notistack";
import {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import Message from "../Message";

type Props = {
  className?: string;
};

export default function MessageArea({className = ""}: Props) {
  const [loading, setLoading] = useState(false);
  const [allMessages, setAllMessages] = useState<Array<MessageType>>([]);
  const selectedChat = useRecoilValue(selectedChatAtom);
  const user = useRecoilValue(userRecoilAtom);

  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    if (!selectedChat?._id) return;
    setLoading(true);
    getChatMessages(selectedChat._id)
      .then((data) => setAllMessages(data))
      .catch((e) => enqueueSnackbar(e.message, {variant: "error"}))
      .finally(() => setLoading(false));
  }, [enqueueSnackbar, selectedChat]);

  return (
    <div className={`p-4 bg-slate-700/20 flex flex-col gap-2 grow ${className}`}>
      {loading ? (
        <div className="center">
          <CircularProgress />
        </div>
      ) : allMessages.length ? (
        allMessages.map((msg) => (
          <Message key={msg._id} isuser={String(msg.sender._id) === user?._id} message={msg} />
        ))
      ) : (
        <div className="center">
          <Typography>No Message</Typography>
        </div>
      )}
    </div>
  );
}
