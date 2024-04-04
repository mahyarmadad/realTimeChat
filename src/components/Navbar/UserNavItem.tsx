import {COLORS} from "@/constants/colors";
import getUserFromMongoDB from "@/server/functions/user";
import {UserButton} from "@clerk/nextjs";
import {Typography} from "@mui/material";
import UserAccount from "./UserAccount";

export default async function UserNavItem({...props}) {
  const currentUser = await getUserFromMongoDB();
  return (
    <div className="flex-center gap-2" {...props}>
      <Typography>{currentUser?.username || ""}</Typography>
      <UserButton
        afterSignOutUrl="/sign-in"
        appearance={{
          elements: {
            avatarBox: "w-6 h-6",
            card: {
              padding: "16px 0",
            },
          },
          variables: {
            colorBackground: COLORS.paperBackground,
            colorPrimary: COLORS.primary,
            colorText: COLORS.text,
            colorAlphaShade: COLORS.shade,
          },
        }}
      />
      <UserAccount currentUser={currentUser} />
    </div>
  );
}
