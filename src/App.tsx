import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Layout } from "./components";

const defaultTheme = createTheme();

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </ThemeProvider>
  );
};
