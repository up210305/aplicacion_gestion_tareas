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
import List from '../List';
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const location = useLocation();
  const showAside = location.pathname === '/list';
  const showNewListButton = location.pathname !== '/' && location.pathname !== '/sign-up';

  const navigate = useNavigate();
  const handleNewList = () => {
    navigate('/new-list');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {showAside && <Aside />}
        <Box sx={{ flex: 1, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
            {showNewListButton && (
              <Button
                variant="contained"
                color="inherit"
                onClick={handleNewList}
                sx={{ color: 'white', mr: 2 }} // Cambia el color del texto a blanco
              >
                New List
              </Button>
            )}
            <IconButton onClick={toggleDarkMode} color="inherit">
              {darkMode ? <WbSunny /> : <Brightness4 />}
            </IconButton>
          </Box>
          <Routes>
            <Route path="/" element={<SignIn darkMode={darkMode} />} />
            <Route path="/sign-up" element={<SignUp darkMode={darkMode} />} />
            <Route path="/list" element={<List darkMode={darkMode} />} />
            <Route path="/new-list" element={<NewList darkMode={darkMode} />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Main;
