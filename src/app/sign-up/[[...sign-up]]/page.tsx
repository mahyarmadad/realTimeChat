import {COLORS} from "@/constants/colors";
import {SignUp} from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="center h-screen">
      <SignUp
        appearance={{
          variables: {
            borderRadius: "12px",
            colorBackground: COLORS.paperBackground,
            colorPrimary: COLORS.primary,
            colorText: COLORS.text,
          },
        }}
      />
    </div>
  );
}
