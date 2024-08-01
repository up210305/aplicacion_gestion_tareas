import { Bookmark, Delete, Edit } from '@mui/icons-material';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ListItem, ListItemText, List as MUIList, Snackbar, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Asegúrate de importar useParams
import AddTask from '../AddTask';
import Aside from '../Aside';

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
        primary={task.task_title}
        secondary={`Created: ${task.creation_date} | Due: ${task.expire_date || 'N/A'}`}
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
      <IconButton onClick={() => onEdit(task.id_task)} sx={{ color: darkMode ? '#1976d2' : 'rgba(0, 0, 0, 0.54)' }}>
        <Edit />
      </IconButton>
    </Box>
  </ListItem>
);

const TaskList = ({ darkMode }) => {
  const { listId } = useParams(); // Obtener listId de los parámetros de la URL
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [listTitle, setListTitle] = useState('My Task List');
  const [listDescription, setListDescription] = useState('This is my list description');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = listId 
          ? await axios.get(`http://localhost:8080/api/lists/${listId}/tasks`) 
          : await axios.get('http://localhost:8080/api/tasks/no-list');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [listId]);

  const handleToggleImportant = async (task) => {
    try {
      await axios.patch(`http://localhost:8080/api/tasks/${task.id_task}`, { important: !task.important });
      task.important = !task.important;
      setTasks([...tasks]);
      if (task.important) {
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error updating task importance:', error);
    }
  };

  const handleDelete = (task) => {
    setTaskToDelete(task);
    setOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${taskToDelete.id_task}`);
      setTasks(tasks.filter(task => task.id_task !== taskToDelete.id_task));
      setOpen(false);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
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

  const handleAddTask = async (taskName, dueDate) => {
    try {
      const response = await axios.post('http://localhost:8080/api/tasks', { 
        task_title: taskName, 
        expire_date: dueDate, 
        list_id: listId ? parseInt(listId) : null 
      });
      const newTask = response.data;
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

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
          {tasks.map((task) => (
            <TaskItem
              key={task.id_task}
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
