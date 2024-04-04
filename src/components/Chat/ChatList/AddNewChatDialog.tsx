import {DialogContainer} from "@/components/utils";
import {IconButton, Typography} from "@mui/material";
import {useCallback} from "react";
import {EssetionalCloseCircleLinear} from "react-icons-sax";
type Props = {
  open: boolean;
  setOpen: Function;
};
export default function AddNewChatDialog({open, setOpen}: Props) {
  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <DialogContainer open={open} classes={{paper: "w-full"}}>
      <div className="p-4 w-full">
        <div className="center relative">
          <Typography>Create New Chat</Typography>
          <IconButton className="absolute right-2" onClick={onClose}>
            <EssetionalCloseCircleLinear />
          </IconButton>
        </div>
      </div>
    </DialogContainer>
  );
}
