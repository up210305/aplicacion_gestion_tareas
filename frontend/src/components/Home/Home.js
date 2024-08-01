// src/components/Home.js
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';

const Home = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        {/* Recent Tasks */}
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" mb={2}>
            <AccessTimeIcon fontSize="large" />
            <Typography variant="h5" ml={1}>Recent Tasks</Typography>
          </Box>
          <Grid container spacing={2}>
            {[1, 2, 3].map((_, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">Task {index + 1}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Today's Tasks */}
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" mb={2}>
            <WbSunnyIcon fontSize="large" />
            <Typography variant="h5" ml={1}>Today</Typography>
          </Box>
          <Grid container spacing={2}>
            {[1, 2, 3].map((_, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">Task {index + 1}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Upcoming Tasks */}
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" mb={2}>
            <CalendarTodayIcon fontSize="large" />
            <Typography variant="h5" ml={1}>Upcoming Tasks</Typography>
          </Box>
          <Grid container spacing={2}>
            {[1, 2, 3].map((_, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">Task {index + 1}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;