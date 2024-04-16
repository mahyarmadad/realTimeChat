import {formatTimeDate} from "@/functions/date";
import {MessageType} from "@/server/models/message";
import CheckIcon from "@mui/icons-material/Check";
import {Typography} from "@mui/material";
import styles from "./message.module.scss";

type Props = {
  isuser?: Boolean;
  className?: String;
  message: MessageType;
};

export default function Message({message, isuser, className = "", ...props}: Props) {
  return (
    <div
      className={`p-2 rounded-lg max-w-[50%] w-fit relative ${styles.message} ${
        isuser
          ? `bg-slate-400 text-black self-end rounded-br-none ${styles.messageUser}`
          : `bg-cyan-950 rounded-bl-none ${styles.messageOther}`
      }    
       ${className}`}
      {...props}>
      <Typography>{message.text}</Typography>
      <div className="flex-center gap-2 justify-end">
        <Typography variant="caption" fontSize={12} color="#4b4b4b">
          {formatTimeDate(message.createdAt)}
        </Typography>
        {isuser ? <CheckIcon sx={{fontSize: 12}} className="text-done" /> : null}
      </div>

      {/* <DoneAllIcon/> */}
      {/* <Typography>{message.readBy}</Typography> */}
    </div>
  );
}
