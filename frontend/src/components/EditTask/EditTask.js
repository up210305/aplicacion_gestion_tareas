// src/components/EditTask.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Typography, IconButton } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import Aside from '../Aside';

const EditTask = ({ darkMode, tasks, setTasks }) => {
  const { id } = useParams();
  const taskId = parseInt(id, 10);
  const task = tasks.find(t => t.id === taskId);
  const [title, setTitle] = useState(task ? task.text : '');
  const [dueDate, setDueDate] = useState(task ? task.dueDate : '');
  const navigate = useNavigate();

  useEffect(() => {
    if (!task) {
      navigate('/list');
    }
  }, [task, navigate]);

  const handleSave = () => {
    const updatedTasks = tasks.map(t =>
      t.id === taskId ? { ...t, text: title, dueDate } : t
    );
    setTasks(updatedTasks);
    navigate(-1); // Go back to the previous screen
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous screen
  };

  return (
    <Box sx={{ display: 'flex', flex: 1 }}>
      <Aside />
      <Box sx={{ flex: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Edit Task
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
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            sx={{ width: '25%' }}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
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

export default EditTask;
