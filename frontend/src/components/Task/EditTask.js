import React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const EditTask = () => {
  return (
    <div>
      <IconButton aria-label="edit" size='large' color='inherit'>
        <EditIcon/>
      </IconButton>
    </div>
  );
};

export default EditTask;
