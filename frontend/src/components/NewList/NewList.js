// src/components/NewList.js
import React, { useState } from 'react';
import { Box, TextField, Typography, IconButton } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import Aside from '../Aside';

const NewList = ({ darkMode, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    console.log('Saving new list:', title, description);
    if (onSave) onSave(); // Call the onSave callback if provided
  };

  const handleCancel = () => {
    if (onCancel) onCancel(); // Call the onCancel callback if provided
  };

  return (
    <Box sx={{ display: 'flex', flex: 1 }}>
      <Aside />
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
    </Box>
  );
};

export default NewList;
