// src/components/AddTask.js
import React from 'react';
import './AddTask.css'; // Puedes crear un archivo de estilos específico para cada componente

const AddTask = () => {
  return (
    <div className="add-task">
      <input type="text" placeholder="Add a new task..." />
      <div className="task-icons">
        <i className="fas fa-plus"></i>
        <i className="fas fa-calendar-alt"></i>
        <i className="fas fa-bell"></i>
      </div>
    </div>
  );
}

export default AddTask;
