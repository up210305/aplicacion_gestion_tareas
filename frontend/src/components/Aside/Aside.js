import React, { useState } from 'react';
import { Bookmark, CheckBox, Home, ViewList, Menu as MenuIcon } from '@mui/icons-material';
import { Avatar, Box, Divider, Drawer, IconButton, InputBase, List, ListItem, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import zegucomImage from '../../assets/images/zegucom.png'; // Asegúrate de que la ruta sea correcta

const Aside = ({ firstName, lastName, username }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 2,
        backgroundColor: isDarkMode ? 'rgba(15,41,91,255)' : 'rgba(0,48,135,255)',
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

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ display: { sm: 'none' }, position: 'fixed', zIndex: 1300 }}
      >
        <MenuIcon />
      </IconButton>
      <Box
        component="nav"
        sx={{ width: { sm: 250 }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: '100%', sm: `calc(100% - 250px)` },
          transition: 'width 0.3s',
          marginLeft: { xs: 0, sm: 250 },
        }}
      >
        {/* Aquí va el contenido principal */}
      </Box>
    </Box>
  );
};

export default Aside;
