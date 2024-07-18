import React from 'react';
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Bookmark, Delete, Edit } from '@mui/icons-material';

const taskList = [
  { id: 1, text: 'Task 1', important: false },
  { id: 2, text: 'Task 2', important: true },
  { id: 3, text: 'Task 3', important: false },
  { id: 4, text: 'Task 4', important: true },
  { id: 5, text: 'Task 5', important: false },
];

const TaskItem = ({ task, onToggleImportant, onDelete, onEdit, darkMode }) => (
  <ListItem
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: darkMode ? '#333' : 'white', // Adjust background color based on dark mode
      marginBottom: '10px',
      borderRadius: '4px',
      color: darkMode ? 'white' : 'inherit', // Adjust text color based on dark mode
    }}
  >
    <ListItemText primary={task.text} sx={{ color: darkMode ? 'white' : 'inherit' }} />
    <Box>
      <IconButton onClick={() => onToggleImportant(task.id)} sx={{ color: task.important ? '#1976d2' : darkMode ? '#fff' : 'rgba(0, 0, 0, 0.54)' }}>
        <Bookmark />
      </IconButton>
      <IconButton onClick={() => onDelete(task.id)} sx={{ color: darkMode ? '#f44336' : 'rgba(0, 0, 0, 0.54)' }}>
        <Delete />
      </IconButton>
      <IconButton onClick={() => onEdit(task.id)} sx={{ color: darkMode ? '#1976d2' : 'rgba(0, 0, 0, 0.54)' }}>
        <Edit />
      </IconButton>
    </Box>
  </ListItem>
);

const TaskList = ({ darkMode, toggleDarkMode }) => {
  const handleToggleImportant = (taskId) => {
    // Implement the logic to toggle the importance of the task
    console.log('Toggle important for task:', taskId);
  };

  const handleDelete = (taskId) => {
    // Implement the logic to delete the task
    console.log('Delete task:', taskId);
  };

  const handleEdit = (taskId) => {
    // Implement the logic to edit the task
    console.log('Edit task:', taskId);
  };

  return (
    <List sx={{ backgroundColor: darkMode ? '#333' : 'white', color: darkMode ? 'white' : 'inherit', borderRadius: '4px', padding: '10px' }}>
      {taskList.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleImportant={handleToggleImportant}
          onDelete={handleDelete}
          onEdit={handleEdit}
          darkMode={darkMode} // Pass darkMode to TaskItem
        />
      ))}
    </List>
  );
};

export default TaskList;
