import {userRecoilAtom} from "@/recoil/user";
import {ChatType} from "@/server/models/chat";
import {UserType} from "@/server/models/user";
import {IconButton, Link} from "@mui/material";
import {useMemo} from "react";
import {ArrowArrowLeft2Outline} from "react-icons-sax";
import {useRecoilValue} from "recoil";

type Props = {
  selectedChat: ChatType;
  onBackClick: () => void;
  setOpenMenu: (value: boolean) => void;
};

export default function RecipientHeader({selectedChat, onBackClick, setOpenMenu}: Props) {
  const user = useRecoilValue(userRecoilAtom);

  const recipient = useMemo(
    () =>
      selectedChat.isGroupChat
        ? null
        : (selectedChat?.users.find((item) => String(item?._id) !== user?._id) as
            | UserType
            | undefined),
    [selectedChat, user?._id],
  );
  const chatName = useMemo(
    () => (selectedChat.isGroupChat ? selectedChat.groupName : recipient?.username),
    [recipient, selectedChat],
  );

  return (
    <div className="flex-center gap-4 h-14 border-slate-900 border-0 border-b border-solid">
      <IconButton onClick={onBackClick}>
        <ArrowArrowLeft2Outline />
      </IconButton>

      <Link
        href="#"
        underline="none"
        color="inherit"
        onClick={() => {
          setOpenMenu(true);
        }}>
        {chatName || ""}
      </Link>
    </div>
  );
}
