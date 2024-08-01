import { Cancel, CheckCircle } from '@mui/icons-material';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewList = ({ darkMode, onSave, onCancel, employeeId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/lists',
        { listName: title, description }, // Envia el cuerpo de la solicitud
        { params: { employeeId } } // Envia employeeId como parámetro de consulta
      );
      console.log('List created:', response.data); // Agrega esto si quieres ver la respuesta
      if (onSave) onSave(); // Llama al callback onSave si se proporciona
      navigate('/list'); // Redirige a la página de listas
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel(); // Llama al callback de cancelación si se proporciona
    navigate('/list'); // Redirige a la página de listas si se cancela
  };

  return (
    <Box sx={{ flex: 1, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        New List
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <IconButton color="primary" onClick={handleSave}>
          <CheckCircle />
        </IconButton>
        <IconButton onClick={handleCancel} sx={{ color: 'grey' }}>
          <Cancel />
        </IconButton>
      </Box>
    </Box>
  );
};

export default NewList;
