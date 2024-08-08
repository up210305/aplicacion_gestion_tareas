import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import axios from 'axios';
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import zglogo from '../../assets/images/zglogo.png';

const StyledContainer = styled(Container)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  backgroundColor: theme.palette.mode === 'dark'
    ? 'rgba(15, 41, 91, 255)'
    : 'rgba(0, 48, 135, 255)',
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(33, 43, 53, 0.9)' : 'white',
  borderRadius: '8px',
  padding: theme.spacing(3),
  maxWidth: '400px',
  width: '100%',
  textAlign: 'center',
}));

const StyledAvatar = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: '50%',
  width: 60,
  height: 60,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
}));

export default function SignIn() {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      username: data.get('username'),
      password: data.get('password'),
    };
    
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
      console.log('Login Response:', response.data);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('employeeId', response.data.employeeId);

      // Verify that the data is stored in local storage
      console.log('Stored token:', localStorage.getItem('token'));
      console.log('Stored employeeId:', localStorage.getItem('employeeId'));
      
      navigate('/home');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in. Please check your username and password.');
    }
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <CssBaseline />
      <StyledBox>
        <StyledAvatar>
          <img src={zglogo} alt="Zegucom Logo" style={{ width: '100%', height: '100%' }} />
        </StyledAvatar>
        <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
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
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs></Grid>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </StyledBox>
    </StyledContainer>
  );
}
