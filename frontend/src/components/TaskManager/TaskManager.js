import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, InputBase, Box } from '@mui/material';
import { Bookmark, Delete, Edit, BookmarkBorder, Add as AddIcon, CalendarToday, Notifications } from '@mui/icons-material';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, id: Date.now(), important: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    setEditingTask(id);
    setEditingText(taskToEdit.text);
  };

  const saveTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: editingText } : task));
    setEditingTask(null);
    setEditingText('');
  };

  const toggleImportant = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, important: !task.important } : task));
  };

  return (
    <Box p={2}>
      <List>
        {tasks.map(task => (
          <ListItem key={task.id} style={{ display: 'flex', alignItems: 'center' }}>
            <ListItemText
              primary={
                editingTask === task.id ? (
                  <InputBase
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    style={{ flexGrow: 1 }}
                  />
                ) : (
                  task.text
                )
              }
            />
            {editingTask === task.id ? (
              <IconButton onClick={() => saveTask(task.id)}>
                <Edit />
              </IconButton>
            ) : (
              <IconButton onClick={() => editTask(task.id)}>
                <Edit />
              </IconButton>
            )}
            <IconButton onClick={() => deleteTask(task.id)}>
              <Delete />
            </IconButton>
            <IconButton onClick={() => toggleImportant(task.id)}>
              {task.important ? <Bookmark /> : <BookmarkBorder />}
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Box display="flex" alignItems="center" mt={2}>
        <InputBase
          placeholder="Enter task name"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{
            flexGrow: 1,
            padding: '4px 8px',
            border: '1px solid grey',
            borderRadius: 4
          }}
        />
        <IconButton onClick={addTask}>
          <AddIcon />
        </IconButton>
        <IconButton>
          <CalendarToday />
        </IconButton>
        <IconButton>
          <Notifications />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TaskManager;
