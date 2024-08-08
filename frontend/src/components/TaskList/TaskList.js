import { Bookmark, BookmarkBorder, CheckCircle, Delete, Edit } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItem,
  ListItemText,
  List as MUIList,
  Snackbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddTask from "../AddTask";
import { formatDate } from '../Formatter/FormatDate'; // Ajusta la ruta según tu estructura de carpetas


const TaskItem = ({ task, onToggleImportant, onToggleComplete, onDelete, onEdit, darkMode }) => (
  <ListItem
    sx={{
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: darkMode ? "rgb(129,165,202)" : "#ccc", // Specific shading color for task items
      marginBottom: "10px",
      borderRadius: "4px",
      color: darkMode ? "white" : "inherit",
    }}
  >
    <Box>
      <ListItemText
        primary={task.title}
        secondary={`Created: ${formatDate(task.creationDate)} | Due: ${formatDate(task.expireDate) || "N/A"}`}
        sx={{ color: darkMode ? "white" : "inherit" }}
      />
    </Box>
    <Box>
      <IconButton
        onClick={() => onToggleComplete(task)}
        sx={{
          color: task.completed ? "#4caf50" : darkMode ? "#fff" : "rgba(0, 0, 0, 0.54)",
        }}
      >
        <CheckCircle />
      </IconButton>
      <IconButton
        onClick={() => onToggleImportant(task)}
        sx={{
          color: task.important ? "#ff9800" : darkMode ? "#fff" : "rgba(0, 0, 0, 0.54)",
        }}
      >
        {task.important ? <Bookmark /> : <BookmarkBorder />}
      </IconButton>
      <IconButton
        onClick={() => onDelete(task)}
        sx={{ color: darkMode ? "#f44336" : "rgba(0, 0, 0, 0.54)" }}
      >
        <Delete />
      </IconButton>
      <IconButton
        onClick={() => onEdit(task.id_task)}
        sx={{ color: darkMode ? "#1976d2" : "rgba(0, 0, 0, 0.54)" }}
      >
        <Edit />
      </IconButton>
    </Box>
  </ListItem>
);

const TaskList = ({ darkMode }) => {
  const { listId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const [listDescription, setListDescription] = useState("");

  useEffect(() => {
    const fetchTasksAndList = async () => {
      if (listId) {
        try {
          // Ejecuta ambas peticiones en paralelo
          const [responseTasks, responseList] = await Promise.all([
            axios.get(`http://localhost:8080/api/lists/${listId}/tasks`).catch((error) => {
              console.error("Error fetching tasks:", error);
              return { data: [] }; // Retorna una respuesta vacía en caso de error
            }),
            axios.get(`http://localhost:8080/api/lists/${listId}`).catch((error) => {
              console.error("Error fetching list details:", error);
              return { data: { name: '', description: '' } }; // Retorna una respuesta vacía en caso de error
            }),
          ]);
  
          // Procesa las respuestas
          setTasks(responseTasks.data);
          setListTitle(responseList.data.name);
          setListDescription(responseList.data.description);
        } catch (error) {
          console.error("Unexpected error:", error);
        }
      } else {
        console.error("listId is undefined or null");
      }
    };
  
    fetchTasksAndList();
  }, [listId]);

  const handleToggleImportant = async (task) => {
    if (!task || !task.id_task) {
      console.error("Invalid task:", task);
      return;
    }

    try {
      await axios.patch(`http://localhost:8080/api/tasks/${task.id_task}`, {
        important: !task.important,
      });
      task.important = !task.important;
      setTasks(tasks.map((t) => (t.id_task === task.id_task ? task : t)));
      if (task.important) {
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error updating task importance:", error);
    }
  };

  const handleToggleComplete = async (task) => {
    if (!task || !task.id_task) {
      console.error("Invalid task:", task);
      return;
    }

    try {
      await axios.patch(`http://localhost:8080/api/tasks/${task.id_task}`, {
        completed: !task.completed,
      });
      task.completed = !task.completed;
      setTasks(tasks.map((t) => (t.id_task === task.id_task ? task : t)));
    } catch (error) {
      console.error("Error updating task completion:", error);
    }
  };

  const handleDelete = (task) => {
    setTaskToDelete(task);
    setOpenDeleteDialog(true);
  };

  const confirmDeleteTask = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${taskToDelete.id_task}`);
      setTasks(tasks.filter((task) => task.id_task !== taskToDelete.id_task));
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleDeleteList = async () => {
    if (!listId) {
      console.error("Invalid listId:", listId);
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/api/lists/${listId}`);
      navigate('/list'); // Redirige a la lista de listas después de la eliminación
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleEdit = (taskId) => {
    console.log("Edit task:", taskId);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleAddTask = async (taskName, dueDate) => {
    try {
      const validListId = listId && !isNaN(listId) ? parseInt(listId) : null;
      if (!validListId) {
        console.error("Invalid listId:", listId);
        return;
      }
      const response = await axios.post("http://localhost:8080/api/tasks", {
        task_title: taskName,
        expire_date: dueDate,
        id_list: validListId,
      });
      const newTask = response.data;
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <Box sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box
        sx={{
          backgroundColor: darkMode ? "rgb(60,101,156)" : "#e0e0e0", // General shading color
          color: darkMode ? "white" : "inherit",
          borderRadius: "4px",
          padding: "10px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h5" gutterBottom>
            {listTitle || "List Title"}
          </Typography>
          <Typography variant="body1">
            {listDescription || "List Description"}
          </Typography>
        </Box>
        <Box>
          <IconButton
            onClick={() => console.log("Edit list")}
            sx={{ color: darkMode ? "#1976d2" : "rgba(0, 0, 0, 0.54)" }}
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteList()}
            sx={{ color: darkMode ? "#f44336" : "rgba(0, 0, 0, 0.54)" }}
          >
            <Delete />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        <MUIList
          sx={{
            backgroundColor: darkMode ? "rgb(60,101,156)" : "#e0e0e0", // General shading color
            color: darkMode ? "white" : "inherit",
            borderRadius: "4px",
            padding: "10px",
            paddingBottom: "70px",
          }}
        >
          {tasks.map((task) => (
            <TaskItem
              key={task.id_task} // Ensure this property is unique
              task={task}
              onToggleImportant={handleToggleImportant}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
              onEdit={handleEdit}
              darkMode={darkMode}
            />
          ))}
        </MUIList>
      </Box>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteTask} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Task marked as important!
        </Alert>
      </Snackbar>
      <AddTask darkMode={darkMode} onAddTask={handleAddTask} />
    </Box>
  );
};

export default TaskList;
