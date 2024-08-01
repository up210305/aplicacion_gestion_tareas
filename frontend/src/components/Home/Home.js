import React, { useState } from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Card, CardContent, Grid, IconButton, Typography, InputBase, Paper } from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const Home = () => {
  const [tasks, setTasks] = useState([
    { name: 'Comprar comestibles', creationDate: '01/08/2024', dueDate: '05/08/2024' },
    { name: 'Preparar presentación', creationDate: '02/08/2024', dueDate: '10/08/2024' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteTask = (task) => {
    setTasks(tasks.filter(t => t !== task));
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
            {filteredTasks.map((task, index) => (
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
                      <IconButton>
                        <StarIcon />
                      </IconButton>
                      <IconButton>
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
            placeholder="Search tasks"
            inputProps={{ 'aria-label': 'Search tasks' }}
            value={searchTerm}
            onChange={handleSearch}
          />
        </Paper>
      </Box>
    </Box>
  );
}

export default Home;
