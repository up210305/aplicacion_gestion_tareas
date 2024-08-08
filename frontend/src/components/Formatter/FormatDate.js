// src/Formatter/FormatDate.js

export const formatDate = (dateArray) => {
    if (!Array.isArray(dateArray) || dateArray.length < 3) return "N/A";
  
    const [year, month, day] = dateArray;
    const formattedMonth = String(month + 1).padStart(2, '0'); // Los meses están basados en 0
    const formattedDay = String(day).padStart(2, '0');
    
    return `${year}/${formattedDay}/${formattedMonth}`;
  };
  