import AppBar from '@mui/material/AppBar';
import CodeIcon from '@mui/icons-material/Code';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

export default function Layout() {
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <CodeIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Code Challenge
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}