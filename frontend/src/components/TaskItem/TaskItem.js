// src/components/TaskItem/TaskItem.js
import React from 'react';
import { Box, IconButton, ListItem, ListItemText } from '@mui/material';
import { Bookmark, Delete, Edit } from '@mui/icons-material';

const TaskItem = ({ task, onToggleImportant, onDelete, onEdit, darkMode }) => (
  <ListItem
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: darkMode ? '#333' : 'white',
      marginBottom: '10px',
      padding: '10px',
      borderRadius: '12px',  // increased border radius for a rounder look
      color: darkMode ? 'white' : 'inherit',
    }}
  >
    <ListItemText primary={task.text} sx={{ color: darkMode ? 'white' : 'inherit' }} />
    <Box>
      <IconButton onClick={() => onToggleImportant(task)} sx={{ color: task.important ? '#1976d2' : darkMode ? '#fff' : 'rgba(0, 0, 0, 0.54)' }}>
        <Bookmark />
      </IconButton>
      <IconButton onClick={() => onDelete(task)} sx={{ color: darkMode ? '#f44336' : 'rgba(0, 0, 0, 0.54)' }}>
        <Delete />
      </IconButton>
      <IconButton onClick={() => onEdit(task.id)} sx={{ color: darkMode ? '#1976d2' : 'rgba(0, 0, 0, 0.54)' }}>
        <Edit />
      </IconButton>
    </Box>
  </ListItem>
);

export default TaskItem;
