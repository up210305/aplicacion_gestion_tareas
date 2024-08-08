import { AddCircle } from '@mui/icons-material';
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewList from '../NewList';

const QList = ({ darkMode }) => {
  const [lists, setLists] = useState([]);
  const [filteredLists, setFilteredLists] = useState([]);
  const [showNewList, setShowNewList] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLists(); 
  }, []);

  useEffect(() => {
    const storedEmployeeId = parseInt(localStorage.employeeId, 10);
  
    const filteredLists = lists.filter((list) => {
      return list.employeeId === storedEmployeeId;
    });

    setFilteredLists(filteredLists);
  }, [lists]);

  const fetchLists = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/lists');
      setLists(response.data);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  const handleListClick = (listId) => {
    if (listId) {
      console.log('Clicked listId:', listId);
      navigate(`/list/${listId}/tasks`);
    } else {
      console.error('Clicked listId is undefined');
    }
  };

  const handleAddList = async () => {
    await fetchLists(); // Recarga la lista después de agregar una nueva lista
    setShowNewList(false); // Cierra el formulario
  };

  return (
    <Box
      sx={{
        padding: '16px',
        backgroundColor: darkMode ? 'rgb(60,101,156)' : '#f5f5f5',
        borderRadius: '12px',
        color: darkMode ? 'white' : 'inherit',
        maxHeight: 'calc(100vh - 64px)', // Ajusta según la altura que desees
        overflowY: 'auto', // Permite el scroll vertical
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: darkMode ? 'white' : 'inherit' }}
      >
        My Lists
      </Typography>
      <List>
      {filteredLists.map((list) => (
          <ListItem
            key={list.id}
            sx={{
              backgroundColor: darkMode ? '#81a5ca' : '#fff',
              marginBottom: '10px',
              borderRadius: '4px',
              color: darkMode ? 'white' : 'inherit',
            }}
            button
            onClick={() => handleListClick(list.id)}
          >
            <ListItemText
              primary={list.name}
              secondary={list.description}
              sx={{ color: darkMode ? 'white' : 'inherit' }}
            />
          </ListItem>
        ))}
      </List>
      {showNewList ? (
        <NewList
          darkMode={darkMode} // Asegúrate de pasar darkMode si es necesario
          onSave={handleAddList} // Pasa handleAddList para manejar la adición y recarga
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
