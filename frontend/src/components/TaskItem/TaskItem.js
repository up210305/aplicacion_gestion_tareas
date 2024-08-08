// Componente TaskItem
const TaskItem = ({ task, onToggleImportant, onToggleComplete, onDelete, onEdit, darkMode }) => (
  <ListItem
    sx={{
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: darkMode ? "rgb(129,165,202)" : "#ccc",
      marginBottom: "10px",
      borderRadius: "4px",
      color: darkMode ? "white" : "inherit",
    }}
  >
    <Box>
      <ListItemText
        primary={task.task_title}
        secondary={`Created: ${formatDate(task.creation_date)} | Due: ${formatDate(task.expire_date) || "N/A"}`}
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
        onClick={() => onEdit(task.id_task)} // Usa onEdit en lugar de handleEdit
        sx={{ color: darkMode ? "#1976d2" : "rgba(0, 0, 0, 0.54)" }}
      >
        <Edit />
      </IconButton>
    </Box>
  </ListItem>
);
