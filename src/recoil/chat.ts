import {ChatType} from "@/server/models/chat";
import {atom} from "recoil";

export const chatListAtom = atom<Array<ChatType>>({
  key: "chatListAtom",
  default: [],
});
