"use client";

import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider, responsiveFontSizes} from "@mui/material/styles";
import {SnackbarProvider} from "notistack";
import React from "react";
import {RecoilRoot} from "recoil";
import theme from "./theme";

export default function ThemeRegistry({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppRouterCacheProvider options={{enableCssLayer: true}}>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <CssBaseline />
        <RecoilRoot>
          <SnackbarProvider>{children}</SnackbarProvider>
        </RecoilRoot>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
