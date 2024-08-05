import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles'; // Import useTheme
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import axios from 'axios'; // Import axios for HTTP requests
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Import the zglogo image
import zglogo from '../../assets/images/zglogo.png'; // Update the path if necessary

import './SignIn.css';

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

const StyledAvatar = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: '50%',
  width: 60,
  height: 60,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default function SignIn() {
  const theme = useTheme(); // Use useTheme here
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      username: data.get('username'),
      password: data.get('password'),
    };
    
    try {
      // Make an HTTP request to your backend for authentication
      const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
      console.log(response.data);

      // Store token and employeeId in local storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('employeeId', response.data.employeeId);
      
      // If authentication is successful, navigate to the home page
      navigate('/home');
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error (e.g., show error message)
      alert('Error logging in. Please check your username and password.');
    }
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <CssBaseline />
      <Box className="container">
        <StyledAvatar className="avatar">
          {/* Use the zglogo image instead of the icon */}
          <img src={zglogo} alt="Zegucom Logo" style={{ width: '100%', height: '100%' }} />
        </StyledAvatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate className="form">
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="submit"
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </StyledContainer>
  );
}
