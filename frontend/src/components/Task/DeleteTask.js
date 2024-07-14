import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
const DeleteTask = () => {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="delete" size='large'>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};

export default DeleteTask;
