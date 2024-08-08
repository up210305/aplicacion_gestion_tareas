// src/services/taskService.js
export const fetchTasks = async () => {
  const response = await fetch('http://164.90.247.244:8080/tasks/today'); //ipdeldroplet
  if (!response.ok) {
    throw new Error('Error fetching tasks');
  }
  return response.json(); // Asegúrate de que la respuesta es un JSON válido
};
