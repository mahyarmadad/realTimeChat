import {ChatType} from "@/server/models/chat";
import {atom} from "recoil";

export const chatListAtom = atom<Array<ChatType>>({
  key: "chatListAtom",
  default: [],
});
export const selectedChatAtom = atom<ChatType | null>({
  key: "selectedChatAtom",
  default: null,
});
export const openAddEditGroupChatAtom = atom<boolean>({
  key: "openAddEditGroupChatAtom",
  default: false,
});
export const editGroupChatAtom = atom<ChatType | null>({
  key: "editGroupChatAtom",
  default: null,
});
