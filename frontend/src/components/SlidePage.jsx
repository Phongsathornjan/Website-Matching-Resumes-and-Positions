import React, { useState } from 'react';
import styled from 'styled-components';

const SlidePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideData = [
    { text: "กฏหมาย", image: "/assets/IconIndex/job-field-13.svg" },
    { text: "การค้าระหว่างประเทศ", image: "/assets/IconIndex/job-field-23.svg" },
    { text: "การศึกษา / การฝึกอบรม", image: "assets/IconIndex/job-field-17.svg" },
    { text: "การเงิน", image: "/assets/IconIndex/job-field-3.svg" },
    { text: "ไอที / คอมพิวเตอร์", image: "/assets/IconIndex/job-field-6.svg" },
    { text: "คมนาคม", image: "/assets/IconIndex/job-field-28.svg" },
    { text: "การตลาด", image: "/assets/IconIndex/job-field-1.svg" },
    { text: "การเกษตรกรรม / ทรัพยากร", image: "/assets/IconIndex/job-field-35.svg" },
    { text: "งานขาย", image: "/assets/IconIndex/job-field-22.svg" },
    { text: "ท่องเที่ยว งานโรงเเรม ", image: "/assets/IconIndex/job-field-46.svg" },
    { text: "จัดซื้อ", image: "/assets/IconIndex/job-field-45.svg" },
    { text: "ทรัพยากรบุคคล", image: "/assets/IconIndex/job-field-5.svg" },
    { text: "โฆษณา / ประชาสัมพันธ์ ", image: "/assets/IconIndex/job-field-19.svg" },
    { text: "ผู้บริหารระดับสูง", image: "/assets/IconIndex/job-field-14.svg" },
    { text: "ฝ่ายผลิต / ผลิตภัณฑ์", image: "/assets/IconIndex/job-field-16.svg"},
    { text: "ช่างเทคนิค", image: "/assets/IconIndex/job-field-47.svg" },
    { text: "ธุรการ", image: "/assets/IconIndex/job-field-20.svg" },
    { text: "บริการลูกค้า", image: "/assets/IconIndex/job-field-2.svg" },
    { text: "บัญชี", image: "/assets/IconIndex/job-field-4.svg" },
    { text: "วิจัยและพัฒนา / วิทยาศาสตร์", image: "/assets/IconIndex/job-field-21.svg" },
    { text: "มนุษยศาสตร์", image: "/assets/IconIndex/job-field-26.svg" },
    { text: "ศิลปกรรมศาสตร์", image: "/assets/IconIndex/job-field-27.svg" },
    { text: "สังคมสงเคราะห์", image: "/assets/IconIndex/job-field-44.svg" },
    { text: "เลขานุการ", image:"/assets/IconIndex/job-field-12.svg" },
    { text: "วิศวกร", image: "/assets/IconIndex/job-field-8.svg" },
    { text: "ออกแบบ / สถาปนิก", image: "/assets/IconIndex/job-field-9.svg" },
    { text: "เภสัชกร / แพทย์ ", image: "/assets/IconIndex/job-field-40.svg" },
    { text: "เศรษฐศาสตร์", image: "/assets/IconIndex/job-field-37.svg" },
  ];

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

  const renderSlides = () => {
    const startIndex = currentSlide * itemsPerSlide;
    const endIndex = startIndex + itemsPerSlide;
    const currentItems = slideData.slice(startIndex, endIndex);

    return (
      <SlideGrid>
        {currentItems.map((item, index) => (
          <SlideItem key={index}>
            <IconContainer>
              <IconImage src={item.image} alt={item.text} />
            </IconContainer>
            <SlideText>{item.text}</SlideText>
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
  max-width: 80%; /* ลดขนาดคอนเทนเนอร์ลงเพื่อเพิ่มพื้นที่สีขาวด้านข้าง */
  padding: 40px; /* เพิ่ม padding ให้กับด้านในของคอนเทนเนอร์ */
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
`;

const SlideItem = styled.div`
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
  box-sizing: border-box; /* ให้รวม padding ในขนาด */
  border-radius: 25px;
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
`;

const SlideNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  position: relative;
`;

export default SlidePage;
