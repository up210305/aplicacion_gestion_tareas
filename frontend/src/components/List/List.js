// src/components/List.js
import React, { useState, useEffect } from 'react';
import { Box, IconButton, List as MUIList, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Snackbar, Alert, Typography } from '@mui/material';
import { Bookmark, Delete, Edit } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import AddTask from '../AddTask';
import Aside from '../Aside';

const initialTaskList = [
  { id: 1, text: 'Task 1', important: false, createdDate: new Date().toLocaleDateString(), dueDate: '', listId: 1 },
  { id: 2, text: 'Task 2', important: true, createdDate: new Date().toLocaleDateString(), dueDate: '2024-08-01', listId: 1 },
  { id: 3, text: 'Task 3', important: false, createdDate: new Date().toLocaleDateString(), dueDate: '', listId: 2 },
  { id: 4, text: 'Task 4', important: true, createdDate: new Date().toLocaleDateString(), dueDate: '2024-07-25', listId: 2 },
  { id: 5, text: 'Task 5', important: false, createdDate: new Date().toLocaleDateString(), dueDate: '', listId: 1 },
];

const sortTasksByDueDate = (tasks) => {
  return tasks.slice().sort((a, b) => {
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (a.dueDate) {
      return -1; 
    } else if (b.dueDate) {
      return 1; 
    } else {
      return 0;
    }
  });
};

const TaskItem = ({ task, onToggleImportant, onDelete, onEdit, darkMode }) => (
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
    <Box>
      <ListItemText 
        primary={task.text}
        secondary={`Created: ${task.createdDate} | Due: ${task.dueDate || 'N/A'}`}
        sx={{ color: darkMode ? 'white' : 'inherit' }}
      />
    </Box>
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

const TaskList = ({ darkMode }) => {
  const { listId } = useParams();
  const [tasks, setTasks] = useState(initialTaskList.filter(task => task.listId === parseInt(listId)));
  const [open, setOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [listTitle, setListTitle] = useState('My Task List');
  const [listDescription, setListDescription] = useState('This is my list description');

  const handleToggleImportant = (task) => {
    task.important = !task.important;
    setTasks([...tasks]);
    if (task.important) {
      setSnackbarOpen(true);
    }
  };

  const handleDelete = (task) => {
    setTaskToDelete(task);
    setOpen(true);
  };

  const confirmDelete = () => {
    setTasks(tasks.filter(task => task.id !== taskToDelete.id));
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (taskId) => {
    console.log('Edit task:', taskId);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleAddTask = (taskName, dueDate) => {
    const newTask = { id: tasks.length + 1, text: taskName, important: false, createdDate: new Date().toLocaleDateString(), dueDate, listId: parseInt(listId) };
    setTasks([...tasks, newTask]);
  };

  const sortedTasks = sortTasksByDueDate(tasks);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Aside />
      <Box sx={{ flex: 1, p: 2 }}>
        <Box sx={{ backgroundColor: darkMode ? '#333' : 'white', color: darkMode ? 'white' : 'inherit', borderRadius: '4px', padding: '10px', marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>
            {listTitle}
          </Typography>
          <Typography variant="body1">
            {listDescription}
          </Typography>
        </Box>
        <MUIList sx={{ backgroundColor: darkMode ? '#333' : 'white', color: darkMode ? 'white' : 'inherit', borderRadius: '4px', padding: '10px', paddingBottom: '70px' /* Extra padding for Add Task bar */ }}>
          {sortedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleImportant={handleToggleImportant}
              onDelete={handleDelete}
              onEdit={handleEdit}
              darkMode={darkMode}
            />
          ))}
        </MUIList>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this task?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="success">
            Task marked as important!
          </Alert>
        </Snackbar>
        <AddTask darkMode={darkMode} onAddTask={handleAddTask} />
      </Box>
    </Box>
  );
};

export default TaskList;
