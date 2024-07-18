// src/components/AddTask/AddTask.js
import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { Add, CalendarToday, Notifications } from '@mui/icons-material';

const AddTask = ({ darkMode }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px',
        backgroundColor: darkMode ? '#222' : '#f5f5f5',
        boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        margin: '10px',
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Enter task name"
        sx={{
          flexGrow: 1,
          marginRight: '8px',
          backgroundColor: darkMode ? '#333' : '#fff',
          borderRadius: '4px',
        }}
        InputProps={{
          style: {
            color: darkMode ? '#fff' : '#000',
          },
        }}
      />
      <IconButton color="primary">
        <Add />
      </IconButton>
      <IconButton color="primary">
        <CalendarToday />
      </IconButton>
      <IconButton color="primary">
        <Notifications />
      </IconButton>
    </Box>
  );
};

export default AddTask;
