import React, { useState } from 'react';
import { Box, IconButton, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Snackbar, Alert } from '@mui/material';
import { Bookmark, Delete, Edit } from '@mui/icons-material';
import AddTask from '../AddTask';

// Define initial tasks with dueDate included
const initialTaskList = [
  { id: 1, text: 'Task 1', important: false, createdDate: new Date().toLocaleDateString(), dueDate: '' },
  { id: 2, text: 'Task 2', important: true, createdDate: new Date().toLocaleDateString(), dueDate: '2024-08-01' },
  { id: 3, text: 'Task 3', important: false, createdDate: new Date().toLocaleDateString(), dueDate: '' },
  { id: 4, text: 'Task 4', important: true, createdDate: new Date().toLocaleDateString(), dueDate: '2024-07-25' },
  { id: 5, text: 'Task 5', important: false, createdDate: new Date().toLocaleDateString(), dueDate: '' },
];

// Function to sort tasks by due date, putting tasks without a due date at the end
const sortTasksByDueDate = (tasks) => {
  return tasks.slice().sort((a, b) => {
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (a.dueDate) {
      return -1; // a comes first if it has a due date and b does not
    } else if (b.dueDate) {
      return 1; // b comes first if it has a due date and a does not
    } else {
      return 0; // both tasks have no due date
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
  const [tasks, setTasks] = useState(initialTaskList);
  const [open, setOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
    const newTask = { id: tasks.length + 1, text: taskName, important: false, createdDate: new Date().toLocaleDateString(), dueDate };
    setTasks([...tasks, newTask]);
  };

  // Sort tasks by due date before rendering
  const sortedTasks = sortTasksByDueDate(tasks);

  return (
    <>
      <List sx={{ backgroundColor: darkMode ? '#333' : 'white', color: darkMode ? 'white' : 'inherit', borderRadius: '4px', padding: '10px' }}>
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
      </List>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task: {taskToDelete?.text}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Added to favorites
        </Alert>
      </Snackbar>
      <AddTask onAddTask={handleAddTask} darkMode={darkMode} />
    </>
  );
};

export default TaskList;
