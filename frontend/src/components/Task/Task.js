import React, { useState } from 'react';
import './Task.css';
import DeleteTask from './DeleteTask'; 
import AddTask from './AddTask'; 
import EditTask from './EditTask'; 
import Stack from '@mui/material/Stack';
import TaskCard from './TaskCard';
import { Container } from '@mui/material';
import { hasFormSubmit } from '@testing-library/user-event/dist/utils';


const Task = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
    { id: 3, title: 'Task 3', completed: false },
  ]);
  
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  
  const handleToggleCompleteTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };
  
  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: '35px' }}>Tasks</h1>
      <div style={{ display: 'grid', justifyContent: 'end', alignItems: 'start', p: 0, paddingRight: '1px' }}>
        <Container maxWidth="md" sx={{ mt: 4 }} >
          {tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onDelete={handleDeleteTask} 
              onToggleComplete={handleToggleCompleteTask} 
            />
          ))}
        </Container>
        <AddTask/>
      </div>
    </div>
    
  );
};

export default Task;
