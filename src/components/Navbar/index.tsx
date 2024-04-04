import {Typography} from "@mui/material";
import UserNavItem from "./UserNavItem";

type Props = {
  className?: String;
};

export default function Navbar({className = ""}: Props) {
  return (
    <div
      className={`fixed inset-x-0 top-0 bg-slate-700 z-10 p-4 flex-center justify-between ${className}`}>
      <Typography>Real Time Chat</Typography>
      <UserNavItem />
    </div>
  );
}
