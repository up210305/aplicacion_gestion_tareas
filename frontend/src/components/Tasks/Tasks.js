import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Delete, Edit, Star, StarBorder } from '@mui/icons-material';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', expireDate: '', taskListId: 0 });
  const [editingTask, setEditingTask] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tasks/allTasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const createTask = async () => {
    if (!newTask.title || !newTask.description || !newTask.expireDate) return;
    try {
      await axios.post('http://localhost:8080/tasks/createTask', {
        ...newTask,
        taskListId: 0,  // Asegurando que el taskListId es 0
      });
      fetchTasks();
      setNewTask({ title: '', description: '', expireDate: '', taskListId: 0 });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const updateImportant = async (task) => {
    try {
      await axios.put(`http://localhost:8080/tasks/updateImportant/${task.id}`, {
        ...task,
        important: !task.important,
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task important status:', error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setOpen(true);
  };

  const handleSaveEditTask = async () => {
    try {
      await axios.put(`http://localhost:8080/tasks/updateTask/${editingTask.id}`, editingTask);
      fetchTasks();
      setOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Task List
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <TextField
          label="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <TextField
          label="Expire Date"
          type="date"
          value={newTask.expireDate}
          onChange={(e) => setNewTask({ ...newTask, expireDate: e.target.value })}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" color="primary" onClick={createTask}>
          Add Task
        </Button>
      </Box>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} sx={{ mb: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
            <ListItemText
              primary={task.title}
              secondary={task.description}
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
      {tasks.length === 0 && (
        <Typography variant="body1" color="textSecondary">
          No tasks available.
        </Typography>
      )}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={editingTask?.title}
            onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            value={editingTask?.description}
            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Expire Date"
            type="date"
            value={editingTask?.expireDate}
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