// src/components/ImportantTasks/ImportantTasks.js
import React from 'react';
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Bookmark, Delete, Edit } from '@mui/icons-material';

// Componente para cada tarea importante
const ImportantTaskItem = ({ task, onToggleImportant, onDelete, onEdit, darkMode }) => (
  <ListItem
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: darkMode ? '#333' : 'white',
      marginBottom: '10px',
      borderRadius: '4px',
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

// Componente principal para mostrar tareas importantes
const ImportantTasks = ({ tasks = [], onToggleImportant, onDelete, onEdit, darkMode }) => {
  const importantTasks = tasks.filter(task => task.important);

  return (
    <Box sx={{ padding: '10px' }}>
      <Typography variant="h6" sx={{ marginBottom: '10px', color: darkMode ? 'white' : 'black' }}>
        Important Tasks
      </Typography>
      {importantTasks.length === 0 ? (
        <Typography variant="body1" sx={{ color: darkMode ? 'white' : 'black' }}>
          No important tasks available.
        </Typography>
      ) : (
        <List sx={{ backgroundColor: darkMode ? '#333' : 'white', color: darkMode ? 'white' : 'inherit', borderRadius: '4px' }}>
          {importantTasks.map(task => (
            <ImportantTaskItem
              key={task.id}
              task={task}
              onToggleImportant={onToggleImportant}
              onDelete={onDelete}
              onEdit={onEdit}
              darkMode={darkMode}
            />
          ))}
        </List>
      )}
    </Box>
  );
};

export default ImportantTasks;
