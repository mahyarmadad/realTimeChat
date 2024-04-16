import {UserType} from "@/server/models/user";
import {IconButton, Typography} from "@mui/material";
import {ArrowArrowLeft2Outline} from "react-icons-sax";

type Props = {
  recipient?: UserType;
  onBackClick: () => void;
};

export default function RecipientHeader({recipient, onBackClick}: Props) {
  return (
    <div className="flex-center gap-4 h-14 border-slate-900 border-0 border-b border-solid">
      <IconButton onClick={onBackClick}>
        <ArrowArrowLeft2Outline />
      </IconButton>

      <Typography>{recipient?.username || ""}</Typography>
    </div>
  );
}
