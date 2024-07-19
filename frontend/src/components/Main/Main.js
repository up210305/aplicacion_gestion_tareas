// src/App.js
import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import List from '../List';
import Aside from '../Aside';
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

  const RenderAside = () => {
    const location = useLocation();
    const showAside = location.pathname === '/list';
    return showAside && <Aside />;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2,
              backgroundColor: 'background.default',
              color: 'text.primary',
              borderBottom: '1px solid',
              borderColor: 'divider',
              flexShrink: 0,
            }}
          >
            <IconButton color="inherit" onClick={toggleDarkMode}>
              {darkMode ? <WbSunny /> : <Brightness4 />}
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flex: 1 }}>
            <RenderAside />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ flex: 1 }}>
                <Routes>
                  <Route path="/list" element={<List darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
                  <Route path="/signup" element={<SignUp darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
                  <Route path="/" element={<SignIn darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
                </Routes>
              </Box>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default Main;
