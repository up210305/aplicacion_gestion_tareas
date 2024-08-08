import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Box, Card, CardContent, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import moment from 'moment-timezone'; // Importa moment-timezone
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTasksForToday();
  }, []);

  useEffect(() => {
    const storedEmployeeId = parseInt(localStorage.employeeId, 10);

    const filteredTasks = tasks.filter((task) => {
      return task.employeeId === storedEmployeeId;
    });

    setFilteredTasks(filteredTasks);
  }, [tasks]);

  const fetchTasksForToday = async () => {
    try {
      const response = await axios.get('http://164.90.247.244:8080/tasks/today');
      console.log('Tasks received:', response.data); // Verifica las fechas aquí
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = moment.utc(dateString).local(); // Convierte a la zona horaria local
    if (!date.isValid()) {
      console.error('Invalid date:', dateString);
      return 'Invalid Date';
    }

    // Ajustar el mes y el día
    const adjustedDate = date.clone().subtract(1, 'months').add(1, 'days');
    
    return adjustedDate.format('MMMM DD, YYYY');
  };

  return (
    <Box 
      sx={{ 
        padding: 4, 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between'
      }}
    >
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
                    <Typography variant="h6" color="textPrimary">
                      {task.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {task.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Created: {formatDate(task.creationDate)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Due: {formatDate(task.expireDate)}
                    </Typography>
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
        </Paper>
      </Box>
    </Box>
  );
}

export default Home;