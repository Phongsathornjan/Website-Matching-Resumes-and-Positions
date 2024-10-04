import React, {useEffect} from "react";

const Alert = ({text}) => {

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = globalStyle;
    document.head.appendChild(styleSheet);

    // Cleanup on component unmount
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);


  return (
    <div style={newLabelStyle}>
      {text}
    </div>
  )
}

  const newLabelStyle = {
    position: 'absolute',
    backgroundColor: '#FD3A44',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 'bold',
    borderRadius: '20px',
    padding: '3px 10px',
    top: '-10px',
    left: '-10px',
    animation: "blinkAnimation 0.9s infinite"
  };

  const globalStyle = `
@keyframes blinkAnimation {
  0% {
    opacity: 1; 
  }
  50% {
    opacity: 0; 
  }
  100% {
    opacity: 1; 
  }
}
  `

export default Alert