import {Typography} from "@mui/material";
import styles from "./message.module.scss";
type Props = {
  isuser?: Boolean;
  className?: String;
  text: String;
};

export default function Message({text = "", isuser, className = "", ...props}: Props) {
  return (
    <div
      className={`p-4 rounded-lg max-w-[50%] w-fit relative ${styles.message} ${
        isuser
          ? `bg-slate-400 text-black self-end rounded-br-none ${styles.messageUser}`
          : `bg-cyan-950 rounded-bl-none ${styles.messageOther}`
      }    
       ${className}`}
      {...props}>
      <Typography>{text}</Typography>
    </div>
  );
}
