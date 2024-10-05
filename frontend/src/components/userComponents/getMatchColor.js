const getMatchColor = (percentage) => {
    if (percentage >= 85) return '#D738F6'; 
    if (percentage >= 70) return '#F66B38'; 
    return '#B2B414'; 
  };

export default getMatchColor