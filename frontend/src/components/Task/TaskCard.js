import React, { useState } from 'react';
import { Card, CardContent, Checkbox, Typography, IconButton } from '@mui/material';
import DeleteTask from './DeleteTask';
import EditTask from './EditTask';
import ImportantTask from './ImportantTask';

const TaskCard = ({ task, onDelete, onToggleComplete }) => {
  const [checked, setChecked] = useState(task.completed);

  const handleToggle = () => {
    setChecked(!checked);
    onToggleComplete(task.id);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };


  return (
    <Card sx={{ display: 'flex', mb: 2, p: 0 }}>
      <Checkbox
        checked={checked}
        onChange={handleToggle}
        inputProps={{ 'aria-label': 'Mark task as completed' }}
      />
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography variant="h7" component="div" sx={{ textDecoration: checked ? 'line-through' : 'none' }}>
          {task.title}
        </Typography>
      </CardContent>
      <IconButton >
        <ImportantTask />
      </IconButton>
      <IconButton aria-label="delete" onClick={handleDelete}>
        <DeleteTask />
      </IconButton>
      <IconButton>
        <EditTask/>
      </IconButton>
    </Card>
  );
};

export default TaskCard;



