import { Bookmark, Delete, Edit } from "@mui/icons-material";
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
import { useParams } from "react-router-dom";
import AddTask from "../AddTask";

const TaskItem = ({ task, onToggleImportant, onDelete, onEdit, darkMode }) => (
  <ListItem
    sx={{
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: darkMode ? "#333" : "white",
      marginBottom: "10px",
      borderRadius: "4px",
      color: darkMode ? "white" : "inherit",
    }}
  >
    <Box>
      <ListItemText
        primary={task.title}
        secondary={`Created: ${task.creationDate} | Due: ${task.expireDate || "N/A"}`}
        sx={{ color: darkMode ? "white" : "inherit" }}
      />
    </Box>
    <Box>
      <IconButton
        onClick={() => onToggleImportant(task)}
        sx={{
          color: task.important ? "#1976d2" : darkMode ? "#fff" : "rgba(0, 0, 0, 0.54)",
        }}
      >
        <Bookmark />
      </IconButton>
      <IconButton
        onClick={() => onDelete(task)}
        sx={{ color: darkMode ? "#f44336" : "rgba(0, 0, 0, 0.54)" }}
      >
        <Delete />
      </IconButton>
      <IconButton
        onClick={() => onEdit(task.id)}
        sx={{ color: darkMode ? "#1976d2" : "rgba(0, 0, 0, 0.54)" }}
      >
        <Edit />
      </IconButton>
    </Box>
  </ListItem>
);

const TaskList = ({ darkMode }) => {
  const { listId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const [listDescription, setListDescription] = useState("");

  useEffect(() => {
    const fetchTasksAndList = async () => {
      if (listId) {
        try {
          const responseTasks = await axios.get(`http://localhost:8080/api/lists/${listId}/tasks`);
          setTasks(responseTasks.data);

          const responseList = await axios.get(`http://localhost:8080/api/lists/${listId}`);
          const listDetails = responseList.data;
          setListTitle(listDetails.name);
          setListDescription(listDetails.description);
        } catch (error) {
          console.error("Error fetching tasks and list:", error);
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

  const handleDelete = (task) => {
    setTaskToDelete(task);
    setOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${taskToDelete.id_task}`);
      setTasks(tasks.filter((task) => task.id_task !== taskToDelete.id_task));
      setOpen(false);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
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
        list_id: validListId,
      });
      const newTask = response.data;
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <Box sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          backgroundColor: darkMode ? "#333" : "white",
          color: darkMode ? "white" : "inherit",
          borderRadius: "4px",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          {listTitle || "List Title"}
        </Typography>
        <Typography variant="body1">
          {listDescription || "List Description"}
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        <MUIList
          sx={{
            backgroundColor: darkMode ? "#333" : "white",
            color: darkMode ? "white" : "inherit",
            borderRadius: "4px",
            padding: "10px",
            paddingBottom: "70px",
          }}
        >
          {tasks.map((task) => (
            <TaskItem
              key={task.id_task} // Asegúrate de que esta propiedad es única
              task={task}
              onToggleImportant={handleToggleImportant}
              onDelete={handleDelete}
              onEdit={handleEdit}
              darkMode={darkMode}
            />
          ))}
        </MUIList>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary">
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
