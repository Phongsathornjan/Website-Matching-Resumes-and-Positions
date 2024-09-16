const getMatchColor = (percentage) => {
    if (percentage >= 90) return '#D738F6'; 
    if (percentage >= 75) return '#F66B38'; 
    return '#7F7D89'; 
  };

export default getMatchColor