import React, { ReactElement } from "react";
import CodeIcon from "@mui/icons-material/Code";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { Footer } from "./components/Footer";

interface LayoutProps {
  children: ReactElement;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="relative">
        <Toolbar>
          <CodeIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Code Challenge
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ flexGrow: 1 }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};
