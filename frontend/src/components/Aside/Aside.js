// src/components/aside/Aside.js
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Avatar, Typography, InputBase } from '@mui/material';
import { Home, CheckBox, ViewList, Bookmark, LocalShipping, Cloud, Diamond } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Aside = () => {
  const navigate = useNavigate(); // Use useNavigate hook

  return (
    <div style={{ width: 250, padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <Avatar />
        <div style={{ marginLeft: 16 }}>
          <Typography variant="subtitle1">Username</Typography>
          <Typography variant="body2">example@hotmail.com</Typography>
        </div>
      </div>
      <InputBase
        placeholder="search"
        style={{
          width: '100%',
          padding: '4px 8px',
          marginBottom: 16,
          border: '1px solid grey',
          borderRadius: 4
        }}
      />
      <List>
        <ListItem button onClick={() => navigate('/home')}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CheckBox />
          </ListItemIcon>
          <ListItemText primary="Tasks" />
        </ListItem>
        <ListItem button onClick={() => navigate('/list')}>
          <ListItemIcon>
            <ViewList />
          </ListItemIcon>
          <ListItemText primary="Lists" />
        </ListItem>
        <ListItem button onClick={() => navigate('/importanttasks')}>
          <ListItemIcon>
            <Bookmark /> {/* Cambiado de Home a Bookmark */}
          </ListItemIcon>
          <ListItemText primary="Important Tasks" />
        </ListItem>
      </List>
      <Divider style={{ margin: '16px 0' }} />
      <List>
        {/* Agregar más ítems aquí si es necesario */}
      </List>
    </div>
  );
};

export default Aside;
