import { Cancel, CheckCircle } from '@mui/icons-material';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

const NewList = ({ darkMode, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Obtener el ID del empleado del almacenamiento local y asegurarse de que sea un número
  const employeeId = parseInt(localStorage.getItem('employeeId'), 10);

  const handleSave = async () => {
    if (!employeeId) {
      console.error('Employee ID is not available');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/lists',
        { name: title, description, employeeId } // Asegúrate de que los nombres de los campos coincidan con los del backend
      );
      console.log('List created:', response.data);
      setTitle(''); // Limpia el campo del título
      setDescription(''); // Limpia el campo de descripción
      if (onSave) onSave(); // Llama al callback onSave que debería cerrar el formulario y recargar la lista
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  const handleCancel = () => {
    setTitle(''); // Limpia el campo del título
    setDescription(''); // Limpia el campo de descripción
    if (onCancel) onCancel(); // Llama al callback de cancelación
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
