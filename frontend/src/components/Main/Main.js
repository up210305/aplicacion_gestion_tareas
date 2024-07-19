// src/App.js
import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import List from './components/List';
import Aside from './components/Aside';
import { Brightness4, WbSunny } from '@mui/icons-material';

function Main() {
  const [darkMode, setDarkMode] = useState(() => {
    // Get initial dark mode value from local storage, default to false (light mode)
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  // Memoize the theme based on darkMode state
  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
      },
    }), [darkMode]);

  // useEffect to save darkMode state to local storage
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
        <Box sx={{ display: 'flex' }}>
          <RenderAside />
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2,
                backgroundColor: 'background.default',
                color: 'text.primary',
              }}
            >
              <IconButton color="inherit" onClick={toggleDarkMode}>
                {darkMode ? <WbSunny /> : <Brightness4 />}
              </IconButton>
            </Box>
            <Routes>
              <Route path="/list" element={<List darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
              <Route path="/signup" element={<SignUp darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
              <Route path="/" element={<SignIn darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
