import "@/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";

import type { AppProps } from "next/app";

import { EntriesProvider } from "@/context/entries";
import { UIProvider } from "@/context/ui";

import { darkTheme, lightTheme } from "@/themes";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  );
}
