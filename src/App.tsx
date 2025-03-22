import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
