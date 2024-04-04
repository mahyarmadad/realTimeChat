import {UserType} from "@/server/models/user";
import {atom} from "recoil";

export const userRecoilAtom = atom<UserType | null>({
  key: "userRecoilAtom",
  default: null,
});
