import { ArrowBack, Brightness4, Logout, WbSunny } from "@mui/icons-material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from 'axios';
import React, { useEffect, useMemo, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Aside from "../Aside";
import Home from "../Home";
import ImportantTasks from "../ImportantTasks/ImportantTasks";
import NewList from "../NewList";
import QList from "../QList";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import TaskList from "../TaskList";

function Main() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
  });

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const response = await axios.get(`http://localhost:8080/api/employee/${userId}`);
          setUser({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            username: response.data.username,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const showAside = !["/", "/signup", "/new-list"].includes(location.pathname);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("employeeId");
    navigate("/");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const commonButtonStyles = {
    borderRadius: "4px",
    "&:hover": {
      boxShadow: (theme) =>
        `0 4px 8px ${
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.5)"
            : "rgba(0, 0, 0, 0.2)"
        }`,
    },
  };

  const isSignInOrSignUp = ["/", "/signup"].includes(location.pathname);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: "column", 
          height: "100vh", 
          backgroundColor: isSignInOrSignUp ? (darkMode ? 'rgba(15,41,91,255)' : 'rgba(0,48,135,255)') : (darkMode ? 'rgba(31,43,57,255)' : 'inherit'),
          overflow: "hidden",
        }}
      >
        {showAside && <Aside 
          firstName={user.firstName} 
          lastName={user.lastName} 
          username={user.username} 
        />}
        <Box
          component="main"
          sx={{
            flex: 1,
            p: 2,
            ml: showAside ? { sm: "250px", xs: "0" } : "0",
            transition: 'margin-left 0.3s',
            display: "flex",
            flexDirection: "column",
            backgroundColor: 'inherit',
            overflowY: "auto", // Agrega esta línea
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            {!isSignInOrSignUp && (
              <IconButton
                onClick={handleBack}
                sx={commonButtonStyles}
              >
                <ArrowBack />
              </IconButton>
            )}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {!isSignInOrSignUp && (
                <IconButton
                  onClick={handleSignOut}
                  sx={commonButtonStyles}
                >
                  <Logout />
                </IconButton>
              )}
              <IconButton
                onClick={() => setDarkMode(!darkMode)}
                color="inherit"
                sx={commonButtonStyles}
              >
                {darkMode ? <WbSunny /> : <Brightness4 />}
              </IconButton>
            </Box>
          </Box>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/list" element={<QList darkMode={darkMode} />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/importanttasks"
              element={<ImportantTasks />}
            />
            <Route path="/new-list" element={<NewList />} />
            <Route
              path="/list/:listId/tasks"
              element={<TaskList darkMode={darkMode} />}
            />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Main;
