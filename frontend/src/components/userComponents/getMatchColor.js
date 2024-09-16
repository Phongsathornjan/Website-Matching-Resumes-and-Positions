const getMatchColor = (percentage) => {
    if (percentage >= 80) return '#8bc34a'; 
    if (percentage >= 65) return '#ff9800'; 
    return '#f44336'; 
  };

export default getMatchColor