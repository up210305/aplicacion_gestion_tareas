import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const EditListDialog = ({ open, onClose, listId, currentTitle, currentDescription, onUpdate }) => {
const [title, setTitle] = useState(currentTitle);
const [description, setDescription] = useState(currentDescription);

const handleSave = async () => {
  try {
    await axios.patch(`http://164.90.247.244:8080/api/lists/${listId}`, {
      name: title,
      description,
    });
    onUpdate(title, description); // Llama a la función para actualizar el estado en el componente principal
    onClose(); // Cierra el diálogo
  } catch (error) {
    console.error("Error updating list:", error);
  }
};

return (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Edit List</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="Title"
        fullWidth
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        margin="dense"
        label="Description"
        fullWidth
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleSave} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
);
};

export default EditListDialog;
