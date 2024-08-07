import { Bookmark, CheckBox, Home, ViewList } from '@mui/icons-material';
import { Avatar, Box, Divider, InputBase, List, ListItem, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import zegucomImage from '../../assets/images/zegucom.png'; // Ensure the path is correct

const Aside = ({ firstName, lastName, username }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 2,
        backgroundColor: isDarkMode ? 'rgba(15,41,91,255)' : 'rgba(0,48,135,255)',
        position: 'fixed', // Fix Aside to the left side
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Avatar />
          <Box sx={{ marginLeft: 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'white' }}>
              {`${firstName} ${lastName}`}
            </Typography>
            <Typography variant="body2" sx={{ color: 'white' }}>
              {username}
            </Typography>
          </Box>
        </Box>
        <InputBase
          placeholder="Search"
          sx={{
            width: '100%',
            padding: '4px 8px',
            marginBottom: 2,
            border: '1px solid grey',
            borderRadius: 1,
            backgroundColor: 'white',
          }}
        />
        <List>
          <ListItem button onClick={() => navigate('/home')}>
            <ListItemIcon>
              <Home sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Home" sx={{ color: 'white' }} />
          </ListItem>
          <ListItem button onClick={() => navigate('/tasks/1')}>
            <ListItemIcon>
              <CheckBox sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Tasks" sx={{ color: 'white' }} />
          </ListItem>
          <ListItem button onClick={() => navigate('/list')}>
            <ListItemIcon>
              <ViewList sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Lists" sx={{ color: 'white' }} />
          </ListItem>
          <ListItem button onClick={() => navigate('/importanttasks')}>
            <ListItemIcon>
              <Bookmark sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Important Tasks" sx={{ color: 'white' }} />
          </ListItem>
        </List>
        <Divider sx={{ marginY: 2, backgroundColor: 'white' }} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
        <img src={zegucomImage} alt="Zegucom" style={{ maxWidth: '100%', height: 'auto' }} />
      </Box>
    </Box>
  );
};

export default Aside;
