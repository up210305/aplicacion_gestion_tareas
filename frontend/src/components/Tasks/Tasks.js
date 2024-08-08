import { Delete, Edit, Star, StarBorder } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddTask from '../AddTask';

function Tasks({ darkMode }) {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const storedEmployeeId = parseInt(localStorage.employeeId, 10);

    const filteredTasks = tasks.filter((task) => {
      return task.employeeId === storedEmployeeId && task.taskListId === null;
    });

    setFilteredTasks(filteredTasks);
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://164.90.247.244:8080/tasks/allTasks');
      console.log('Fetched tasks:', response.data); // Debug log
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://164.90.247.244:8080/tasks/${taskId}`);
      console.log('Deleted task ID:', taskId); // Debug log
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const updateImportant = async (task) => {
    try {
      await axios.put(`http://164.90.247.244:8080/tasks/updateImportant/${task.id}`, {
        ...task,
        important: !task.important,
      });
      console.log('Updated important status for task ID:', task.id); // Debug log
      setTasks(prevTasks =>
        prevTasks.map(t => t.id === task.id ? { ...t, important: !t.important } : t)
      );
    } catch (error) {
      console.error('Error updating task important status:', error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask({
      ...task,
      expireDate: task.expireDate ? task.expireDate.split('T')[0] : '', // Format date for input
    });
    setOpen(true);
  };

  const handleSaveEditTask = async () => {
    try {
      await axios.put(`http://164.90.247.244:8080/tasks/updateTask/${editingTask.id}`, {
        ...editingTask,
        expireDate: editingTask.expireDate ? `${editingTask.expireDate}T00:00:00` : null, // Add time part
      });
      console.log('Saved edited task ID:', editingTask.id); // Debug log
      setTasks(prevTasks =>
        prevTasks.map(t => t.id === editingTask.id ? { ...t, ...editingTask } : t)
      );
      setOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleAddTask = async (taskName, taskDescription, dueDate) => {
    try {
      const employeeId = Number(localStorage.getItem('employeeId'));
    
      if (isNaN(employeeId) || !Number.isInteger(employeeId)) {
        throw new Error('Invalid employeeId');
      }
      const response = await axios.post('http://164.90.247.244:8080/tasks/add', {
        title: taskName,
        description: taskDescription,
        expireDate: dueDate ? `${dueDate}T00:00:00` : null,
        employee: { idEmployee: employeeId },
        taskList: null
      });
      const newTask = response.data;
      console.log('Added new task:', newTask); // Debug log
      setTasks(prevTasks => [newTask, ...prevTasks]); // Add the new task to the beginning of the list
    } catch (error) {
      console.error('Error adding task:', error);
    }
    await fetchTasks();
  };

  const formatDate = (dateArray) => {
    if (!dateArray || !Array.isArray(dateArray) || dateArray.length < 3) {
      return 'No due date';
    }
    const [year, month, day, hours = 0, minutes = 0] = dateArray;
    const date = new Date(year, month - 1, day, hours, minutes);
    return date.toLocaleDateString(); // You can adjust the format as needed
  };

  return (
    <Box
      sx={{
        padding: '16px',
        backgroundColor: darkMode ? 'rgb(60,101,156)' : '#f5f5f5',
        borderRadius: '12px',
        color: darkMode ? 'white' : 'inherit',
        maxHeight: 'calc(100vh - 64px)',
        overflowY: 'auto',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: darkMode ? 'white' : 'inherit' }}
      >
        Tasks
      </Typography>
      <List>
        {filteredTasks.map((task) => (
          <ListItem
            key={task.id}
            sx={{
              backgroundColor: darkMode ? '#81a5ca' : '#fff',
              marginBottom: '10px',
              borderRadius: '4px',
              color: darkMode ? 'white' : 'inherit',
            }}
          >
            <ListItemText
              primary={task.title}
              secondary={`Description: ${task.description || 'No description'} - Created on ${formatDate(task.creationDate)} - Due by ${task.expireDate ? formatDate(task.expireDate) : 'No due date'}`}
              sx={{ color: darkMode ? 'white' : 'inherit' }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => updateImportant(task)}>
                {task.important ? <Star /> : <StarBorder />}
              </IconButton>
              <IconButton edge="end" onClick={() => handleEditTask(task)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDeleteTask(task.id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {filteredTasks.length === 0 && (
        <Typography variant="body1" color="textSecondary">
          No tasks available.
        </Typography>
      )}
      <AddTask darkMode={darkMode} onAddTask={handleAddTask} />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={editingTask?.title || ''}
            onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            value={editingTask?.description || ''}
            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Expire Date"
            type="date"
            value={editingTask?.expireDate || ''}
            onChange={(e) => setEditingTask({ ...editingTask, expireDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveEditTask} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Tasks;
