import {selectedChatAtom} from "@/recoil/chat";
import {userRecoilAtom} from "@/recoil/user";
import {sendNewMessage} from "@/server/functions/messages";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import {useSnackbar} from "notistack";
import {useCallback, useState} from "react";
import {EssetionalSend2Linear} from "react-icons-sax";
import {useRecoilValue} from "recoil";

type Props = {};
// const DUM_TXT = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`;

export default function MessageInput({}: Props) {
  const [text, setText] = useState("");
  const selectedChat = useRecoilValue(selectedChatAtom);
  const user = useRecoilValue(userRecoilAtom);

  const {enqueueSnackbar} = useSnackbar();

  const onSendMessage = useCallback(async () => {
    try {
      const payload = {
        text: text,
        image: "",
        sender: user?._id,
        chat: selectedChat?._id,
      };
      await sendNewMessage(payload);
      setText("");
    } catch (error: any) {
      enqueueSnackbar(error.message, {variant: "error"});
    }
  }, [enqueueSnackbar, selectedChat?._id, text, user?._id]);

  return (
    <div>
      <TextField
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onSendMessage}>
                <EssetionalSend2Linear />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
      />
    </div>
  );
}
