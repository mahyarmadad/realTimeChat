import AuthLayout from "@/components/Layout/AuthLayout";
import ThemeRegistry from "@/components/ThemeRegistry";
import {ClerkProvider} from "@clerk/nextjs";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import type {Metadata} from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Real Time Chat",
  description: "Next App for chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeRegistry>
            <AuthLayout>{children}</AuthLayout>
          </ThemeRegistry>
        </body>
      </html>
    </ClerkProvider>
  );
}
