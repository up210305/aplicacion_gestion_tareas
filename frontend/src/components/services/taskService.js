// src/services/taskService.js
export const fetchTasks = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Incluye cookies si es necesario para la autenticación
    });

    if (!response.ok) {
      throw new Error(`Error fetching tasks: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};
