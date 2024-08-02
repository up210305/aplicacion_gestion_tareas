<<<<<<< HEAD
import { Brightness4, WbSunny } from '@mui/icons-material';
import Box from '@mui/material/Box';
=======
// src/components/Main/Main.js
import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
>>>>>>> 28be44ee16813cb362a7cd033cc11388ba05a3a4
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useMemo, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Aside from '../Aside'; // Import the Aside component
import Home from '../Home';
import List from '../List'; // Import List component
import NewList from '../NewList';
import QList from '../QList';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
<<<<<<< HEAD
=======
import QList from '../QList';
import NewList from '../NewList';
import Home from '../Home';
import ImportantTasks from '../ImportantTasks/ImportantTasks'; // Ruta corregida
import List from '../List';  
import { Brightness4, WbSunny } from '@mui/icons-material';
import Aside from '../Aside'; 
>>>>>>> 28be44ee16813cb362a7cd033cc11388ba05a3a4

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
  const showAside = location.pathname === '/list' || location.pathname === '/home' || location.pathname === '/importanttasks';

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
            <Route path="/importanttasks" element={<ImportantTasks darkMode={darkMode} />} />
            <Route path="/new-list" element={<NewList darkMode={darkMode} />} />
            <Route path="/home" element={<Home />} />
<<<<<<< HEAD
            <Route path="/list/:listId" element={<List darkMode={darkMode} />} /> {/* Ensure this route matches */}
            <Route path="/tasks/:listId" element={<List darkMode={darkMode} />} /> {/* Ensure this route matches */}
=======
            <Route path="/list/:listId" element={<List darkMode={darkMode} />} />
>>>>>>> 28be44ee16813cb362a7cd033cc11388ba05a3a4
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Main;
