// src/components/AddTask/AddTask.js
import React, { useState } from 'react';
import { Box, TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Add, CalendarToday, Cancel } from '@mui/icons-material';

const AddTask = ({ darkMode, onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const handleAddTask = () => {
    if (taskName.trim()) {
      onAddTask(taskName, dueDate);
      setTaskName('');
      setDueDate('');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px',
        backgroundColor: darkMode ? '#222' : '#f5f5f5',
        boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        position: 'fixed',
        bottom: '0',
        left: '240px', // Adjust based on the width of the aside component
        right: '0',
        margin: '10px',
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Enter task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
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
      <IconButton color="primary" onClick={handleAddTask}>
        <Add />
      </IconButton>
      <IconButton color="primary" onClick={() => setOpenDatePicker(true)}>
        <CalendarToday />
      </IconButton>
      <IconButton color="primary" onClick={() => { setTaskName(''); setDueDate(''); }}>
        <Cancel />
      </IconButton>

      <Dialog open={openDatePicker} onClose={() => setOpenDatePicker(false)}>
        <DialogTitle>Select Due Date</DialogTitle>
        <DialogContent>
          <TextField
            type="date"
            fullWidth
            variant="outlined"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDatePicker(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => setOpenDatePicker(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddTask;
