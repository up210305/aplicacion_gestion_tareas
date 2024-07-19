// src/components/Main.js
import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import QList from '../QList'; // Import QList component
import Aside from '../Aside';
import NewList from '../NewList';
import Home from '../Home'; // Import Home component
import { Brightness4, WbSunny } from '@mui/icons-material';

function Main() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
      },
    }), [darkMode]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const location = useLocation();
  const showAside = location.pathname === '/list' || location.pathname === '/home';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {showAside && <Aside />}
        <Box sx={{ flex: 1, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
            <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
              {darkMode ? <WbSunny /> : <Brightness4 />}
            </IconButton>
          </Box>
          <Routes>
            <Route path="/" element={<SignIn darkMode={darkMode} />} />
            <Route path="/signup" element={<SignUp darkMode={darkMode} />} />
            <Route path="/list" element={<QList darkMode={darkMode} />} />
            <Route path="/new-list" element={<NewList darkMode={darkMode} />} />
            <Route path="/home" element={<Home />} /> {/* Add route for Home */}
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Main;
