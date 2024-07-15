import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
const DeleteTask = () => {
  return (
    <div>
      <IconButton aria-label="delete" size='large' color='inherit' >
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default DeleteTask;


