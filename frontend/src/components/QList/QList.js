import AddCircle from "@mui/icons-material/AddCircle";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewList from "../NewList";

const QList = ({ darkMode }) => {
  const [lists, setLists] = useState([]);
  const [showNewList, setShowNewList] = useState(false);
  const navigate = useNavigate();

  // Configura la URL base para Axios
  const API_URL = "http://localhost:8080/api/lists";

  // Fetch lists from backend
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get(API_URL);
        setLists(response.data);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    fetchLists();
  }, []);

  // Handle adding a new list
  const handleAddList = async (title, description) => {
    try {
      const response = await axios.post(API_URL, {
        list_name: title,
        description,
      });
      const newList = response.data;
      setLists([...lists, newList]);
      setShowNewList(false);
    } catch (error) {
      console.error("Error adding list:", error);
    }
  };

  // Handle clicking on a list item
const handleListClick = (listId) => {
  navigate(`/list/${listId}`); // Navega a la ruta que contiene el listId
};

  return (
    <Box
      sx={{
        padding: "16px",
        backgroundColor: darkMode ? "#222" : "#f5f5f5",
        borderRadius: "12px",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: darkMode ? "#fff" : "#000" }}
      >
        My Lists
      </Typography>
      <List>
        {lists.map((list) => (
          <ListItem
            key={list.id_list} // Asegúrate de que id_list es único y no undefined
            sx={{
              backgroundColor: darkMode ? "#333" : "#fff",
              marginBottom: "10px",
              borderRadius: "4px",
            }}
            button
            onClick={() => handleListClick(list.id_list)}
          >
            <ListItemText
              primary={list.list_name}
              secondary={list.description}
              sx={{ color: darkMode ? "#fff" : "#000" }}
            />
          </ListItem>
        ))}
      </List>
      {showNewList ? (
        <NewList
          darkMode={darkMode}
          onSave={(title, description) => handleAddList(title, description)}
          onCancel={() => setShowNewList(false)}
        />
      ) : (
        <IconButton color="primary" onClick={() => setShowNewList(true)}>
          <AddCircle />
        </IconButton>
      )}
    </Box>
  );
};

export default QList;
