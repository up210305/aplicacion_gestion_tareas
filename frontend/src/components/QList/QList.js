import { AddCircle } from '@mui/icons-material';
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewList from '../NewList'; // Asegúrate de que este import sea correcto

const QList = ({ darkMode }) => {
  const [lists, setLists] = useState([]);
  const [showNewList, setShowNewList] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/lists');
        setLists(response.data);
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    };

    fetchLists();
  }, []);

  const handleListClick = (listId) => {
    if (listId) {
      console.log('Clicked listId:', listId);
      navigate(`/list/${listId}/tasks`);
    } else {
      console.error('Clicked listId is undefined');
    }
  };

  const handleAddList = async (title, description) => {
    try {
      const newList = { name: title, description, employeeId: 1 }; // Ajusta employeeId según tu lógica
      const response = await axios.post('http://localhost:8080/api/lists', newList);
      setLists([...lists, response.data]);
      setShowNewList(false);
    } catch (error) {
      console.error('Error adding new list:', error);
    }
  };

  return (
    <Box
      sx={{
        padding: '16px',
        backgroundColor: darkMode ? '#222' : '#f5f5f5',
        borderRadius: '12px',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: darkMode ? '#fff' : '#000' }}
      >
        My Lists
      </Typography>
      <List>
        {lists.map((list) => (
          <ListItem
            key={list.id}
            sx={{
              backgroundColor: darkMode ? '#333' : '#fff',
              marginBottom: '10px',
              borderRadius: '4px',
            }}
            button
            onClick={() => handleListClick(list.id)}
          >
            <ListItemText
              primary={list.name}
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
