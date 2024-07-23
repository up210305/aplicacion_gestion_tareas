// src/components/QList.js
import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import AddCircle from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import NewList from '../NewList';

const QList = ({ darkMode }) => {
  const [lists, setLists] = useState([]);
  const [showNewList, setShowNewList] = useState(false);
  const navigate = useNavigate();

  const handleAddList = (title, description) => {
    const newList = { id: lists.length + 1, title, description };
    setLists([...lists, newList]);
    setShowNewList(false);
  };

  const handleListClick = (listId) => {
    navigate(`/list/${listId}`);
  };

  return (
    <Box sx={{ padding: '16px', backgroundColor: darkMode ? '#222' : '#f5f5f5', borderRadius: '12px' }}>
      <Typography variant="h4" gutterBottom sx={{ color: darkMode ? '#fff' : '#000' }}>
        My Lists
      </Typography>
      <List>
        {lists.map((list) => (
          <ListItem 
            key={list.id} 
            sx={{ backgroundColor: darkMode ? '#333' : '#fff', marginBottom: '10px', borderRadius: '4px' }}
            button
            onClick={() => handleListClick(list.id)}
          >
            <ListItemText 
              primary={list.title}
              secondary={list.description}
              sx={{ color: darkMode ? '#fff' : '#000' }}
            />
          </ListItem>
        ))}
      </List>
      {showNewList ? (
        <NewList
          darkMode={darkMode}
          onSave={(title, description) => handleAddList(title, description)}
          onCancel={() => setShowNewList(false)}
        />
      ) : (
        <IconButton color="primary" onClick={() => setShowNewList(true)}>
          <AddCircle />
        </IconButton>
      )}
    </Box>
  );
};

export default QList;
