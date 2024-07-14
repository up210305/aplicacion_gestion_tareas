import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

const theme = createTheme();

const AddTask = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Box
          sx={{
            display: 'flex',
            height: '97vh',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            p: 1,
          }}
        >
          <TextField
            label="Add a Task"
            sx={{ width: '1000px' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                  <IconButton>
                    <CalendarMonthIcon />
                  </IconButton>
                  <IconButton>
                    <AccessAlarmIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default AddTask;
