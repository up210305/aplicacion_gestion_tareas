// src/components/Main.js
import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate(); // Define navigate using useNavigate hook

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const location = useLocation();
  const showAside = location.pathname === '/list';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {showAside && <Aside />}
        <Box sx={{ flex: 1, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
            <IconButton onClick={toggleDarkMode} color="inherit">
              {darkMode ? <WbSunny /> : <Brightness4 />}
            </IconButton>
          </Box>
          <Routes>
            <Route path="/" element={<SignIn darkMode={darkMode} />} />
            <Route path="/sign-up" element={<SignUp darkMode={darkMode} />} />
            <Route path="/list" element={<QList darkMode={darkMode} />} /> {/* Update route for QList */}
            <Route path="/new-list" element={<NewList darkMode={darkMode} />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Main;
