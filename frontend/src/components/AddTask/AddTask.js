import { Add, CalendarToday, Cancel } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';

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
        backgroundColor: darkMode ? 'rgb(60,101,156)' : '#e0e0e0', // Match general shading
        boxShadow: darkMode ? '0 2px 5px rgba(0, 0, 0, 0.2)' : '0 2px 5px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        position: 'relative',
        marginTop: '10px',
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
          backgroundColor: darkMode ? 'rgb(129,165,202)' : '#fff', // Match specific shading
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