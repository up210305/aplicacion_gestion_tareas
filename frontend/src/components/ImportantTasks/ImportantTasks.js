import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Grid, Typography, IconButton } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const ImportantTasks = ({ darkMode }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchImportantTasks = async () => {
      try {
        const response = await axios.get('http://164.90.247.244:8080/tasks/important');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching important tasks:', error);
      }
    };

    fetchImportantTasks();
  }, []);

  return (
    <Box 
      sx={{ 
        padding: 4, 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        // backgroundColor: darkMode ? '#333' : 'white',
        // color: darkMode ? 'white' : 'inherit'
      }}
    >
      <Box>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" mb={2}>
            <BookmarkIcon fontSize="large" />
            <Typography variant="h5" ml={1}>Important Tasks</Typography>
          </Box>
          <Grid container spacing={2}>
            {tasks.map((task, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card >
                  <CardContent>
                    <Typography variant="h6" color="textPrimary">
                      {task.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {task.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ImportantTasks;
