import { Brightness4, Logout, WbSunny } from "@mui/icons-material";
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
        // Cambia el ID de 1 al ID del usuario actualmente autenticado
        const response = await axios.get(`/api/employee/${localStorage.getItem('employeeId')}`);
        setUser({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          username: response.data.username,
        });
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh" }}>
        {showAside && <Aside 
          firstName={user.firstName} 
          lastName={user.lastName} 
          username={user.username} 
        />}
        <Box
          sx={{
            flex: 1,
            p: 2,
            ml: showAside ? "250px" : "0", // Ajusta el margen izquierdo si el Aside está visible
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mb: 2,
            }}
          >
            <IconButton
              onClick={handleSignOut}
              sx={commonButtonStyles}
            >
              <Logout />
            </IconButton>
            <IconButton
              onClick={() => setDarkMode(!darkMode)}
              color="inherit"
              sx={commonButtonStyles}
            >
              {darkMode ? <WbSunny /> : <Brightness4 />}
            </IconButton>
          </Box>
          <Routes>
            <Route path="/" element={<SignIn darkMode={darkMode} />} />
            <Route path="/signup" element={<SignUp darkMode={darkMode} />} />
            <Route path="/list" element={<QList darkMode={darkMode} />} />
            <Route path="/home" element={<Home darkMode={darkMode} />} />
            <Route
              path="/importanttasks"
              element={<ImportantTasks darkMode={darkMode} />}
            />
            <Route path="/new-list" element={<NewList darkMode={darkMode} />} />
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
