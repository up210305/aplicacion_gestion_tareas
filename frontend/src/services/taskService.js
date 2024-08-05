// src/services/taskService.js
export const fetchTasks = async () => {
  const response = await fetch('http://localhost:8080/api/tasks');
  if (!response.ok) {
    throw new Error('Error fetching tasks');
  }
  return response.json(); // Asegúrate de que la respuesta es un JSON válido
};
