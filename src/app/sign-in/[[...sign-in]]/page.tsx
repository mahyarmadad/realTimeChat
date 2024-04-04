import {COLORS} from "@/constants/colors";
import {SignIn} from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="center h-screen">
      <SignIn
        appearance={{
          variables: {
            borderRadius: "12px",
            colorBackground: COLORS.paperBackground,
            colorPrimary: COLORS.primary,
            colorText: COLORS.primary,
          },
        }}
      />
    </div>
  );
}
