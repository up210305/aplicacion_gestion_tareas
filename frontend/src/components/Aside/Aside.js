import { Bookmark, CheckBox, Home, ViewList } from '@mui/icons-material';
import { Avatar, Divider, InputBase, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Aside = () => {
  const navigate = useNavigate();

  // Example listId for demonstration; replace with actual logic as needed
  const exampleListId = 1;

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
        <ListItem button onClick={() => navigate(`/tasks/${exampleListId}`)}>
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
        <ListItem button>
          <ListItemIcon>
            <Bookmark />
          </ListItemIcon>
          <ListItemText primary="Important" />
        </ListItem>
      </List>
      <Divider style={{ margin: '16px 0' }} />
    </div>
  );
};

export default Aside;
