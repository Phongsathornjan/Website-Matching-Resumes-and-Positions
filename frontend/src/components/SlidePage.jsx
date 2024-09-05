import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import { careerFileContext } from '../context/careerFileContext'
import jobFileData from './Data/jobField';

const SlidePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [jobfield, setJobField] = React.useContext(careerFileContext);

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
  
  const slideData = jobFileData;
  

  const itemsPerSlide = 10; 
  const slideCount = Math.ceil(slideData.length / itemsPerSlide);

  const handleNext = () => {
    if (currentSlide < slideCount - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const onClick = (value) => {
    setJobField(value)
  }

  const renderSlides = () => {
    const startIndex = currentSlide * itemsPerSlide;
    const endIndex = startIndex + itemsPerSlide;
    const currentItems = slideData.slice(startIndex, endIndex);

    return (
      <SlideGrid key={currentSlide}>
        {currentItems.map((item, index) => (
          <SlideItem key={index} onClick={ () => onClick(item)}>
            <IconContainer>
              <IconImage src={item.image} alt={item.value} />
            </IconContainer>
            <SlideText>{item.value}</SlideText>
          </SlideItem>
        ))}
      </SlideGrid>
    );
  };

  return (
    <center>
      <SlideContainer>
        <div>
          {renderSlides()}
        </div>
      </SlideContainer>
      <SlideNavigation>
        <NavigationButton onClick={handlePrev} disabled={currentSlide === 0}>
          {'<'}
        </NavigationButton>
        <div style={{ width: '40px' }}></div>
        <NavigationButton onClick={handleNext} disabled={currentSlide === slideCount - 1}>
          {'>'}
        </NavigationButton>
      </SlideNavigation>
    </center>
  );
};

const SlideContainer = styled.div`
  background-color: #fff;
  margin: auto; 
  max-width: 80%; 
  padding: 40px; 
  border-radius: 50px; 
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); 
  position: relative;
`;

const SlideGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  grid-template-rows: repeat(2, auto);
  gap: 10px;
  justify-items: center;
  animation: fadeInFromBottom 0.5s ease-in;
`;

let SlideItem = styled.div`
  text-align: center;
  margin-top: 10px;
  margin-left: 2px;
  margin-right: 2px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 210px; 
  height: 150px; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 25px;

  &:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); 
  }
`;

const IconContainer = styled.div`
  background-color: #E6F7FF;
  border-radius: 50%;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  margin: 0 auto 10px;
`;

const IconImage = styled.img`
  width: 30px;
  height: 30px;
`;

const SlideText = styled.div`
  font-size: 14px;
  color: #000;
`;

const NavigationButton = styled.button`
  background-color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  border: none;
  margin: 0 10px;
  position: relative; /* ตำแหน่งของปุ่ม */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); 
  }
`;

const SlideNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  position: relative;
`;


const globalStyle = `
@keyframes fadeInFromBottom {
  0% {
    opacity: 0;
    transform: translateY(20px); /* เริ่มต้นจากด้านล่าง */
  }
  100% {
    opacity: 1;
    transform: translateY(0); /* เลื่อนกลับไปที่ตำแหน่งเดิม */
  }
}

body {
  margin: 0;
  font-family: 'Trirong', sans-serif;
}
`;

export default SlidePage;
