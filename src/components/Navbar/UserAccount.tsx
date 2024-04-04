"use client";

import {userRecoilAtom} from "@/recoil/user";
import {UserType} from "@/server/models/user";
import {useEffect} from "react";
import {useSetRecoilState} from "recoil";

type Props = {
  currentUser: UserType | null;
};
export default function UserAccount({currentUser}: Props) {
  const setUser = useSetRecoilState(userRecoilAtom);

  useEffect(() => {
    if (currentUser) setUser(currentUser);
  }, [currentUser, setUser]);

  return null;
}
