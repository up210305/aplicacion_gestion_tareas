// src/components/Home.js
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Box, Card, CardContent, Grid, IconButton, Typography, InputBase, Paper, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import React, { useState } from 'react';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const Home = () => {
  const [taskName, setTaskName] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const handleAddTask = (event) => {
    event.preventDefault();
    const creationDate = format(new Date(), 'dd/MM/yyyy');
    const dueDate = selectedDate ? format(selectedDate, 'dd/MM/yyyy') : 'No due date';

    const newTask = {
      name: taskName,
      creationDate,
      dueDate,
    };

    setTasks([...tasks, newTask]);
    setTaskName('');
    setSelectedDate(null);
  };

  const handleEditTask = (task) => {
    console.log(`Editando tarea: ${task.name}`);
  };

  const handleDeleteTask = (task) => {
    setTasks(tasks.filter(t => t !== task));
    console.log(`Borrando tarea: ${task.name}`);
  };

  const handleMarkImportant = (task) => {
    console.log(`Marcado como importante: ${task.name}`);
  };

  const handleOpenDatePicker = () => {
    setOpenDatePicker(true);
  };

  const handleCloseDatePicker = () => {
    setOpenDatePicker(false);
  };

  return (
    <Box sx={{ padding: 4, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" mb={2}>
            <WbSunnyIcon fontSize="large" />
            <Typography variant="h5" ml={1}>Today</Typography>
          </Box>
          <Grid container spacing={2}>
            {tasks.map((task, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      {task.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Created: {task.creationDate}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Due: {task.dueDate}
                    </Typography>
                    <Box display="flex" justifyContent="flex-end">
                      <IconButton onClick={() => handleMarkImportant(task)}>
                        <StarIcon />
                      </IconButton>
                      <IconButton onClick={() => handleEditTask(task)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteTask(task)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)', width: '50%' }}>
        <Paper 
          component="form" 
          onSubmit={handleAddTask}
          sx={{ 
            p: '2px 4px', 
            display: 'flex', 
            alignItems: 'center', 
            boxShadow: 1,
            borderRadius: 2
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Enter task name"
            inputProps={{ 'aria-label': 'Enter task name' }}
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <IconButton sx={{ p: '10px' }} aria-label="select date" onClick={handleOpenDatePicker}>
            <CalendarTodayIcon />
          </IconButton>
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="add task">
            <AddIcon />
          </IconButton>
        </Paper>
      </Box>

      <Dialog open={openDatePicker} onClose={handleCloseDatePicker}>
        <DialogTitle>Select Due Date</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
            <DatePicker
              label="Due Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              renderInput={(params) => <InputBase {...params} sx={{ width: '100%' }} />}
              inputFormat="dd/MM/yyyy"
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDatePicker}>Cancel</Button>
          <Button onClick={handleCloseDatePicker}>OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Home;