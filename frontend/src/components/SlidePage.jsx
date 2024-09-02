import React, { useState } from 'react';
import '../css/Slide.css'; 

const SlidePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideData = [
    "ฝ่ายผลิต / ผลิตภัณฑ์",
    "การสร้างระหว่างประเทศ",
    "การศึกษา / การฝึกอบรม",
    "การเงิน",
    "ไอที / คอมพิวเตอร์",
    "การตลาด",
    "ผู้บริหารระดับสูง",
    "เภสัชกร / แพทย์ / สาธารณสุข",
    "วิศวกร",
    "ผู้บริหารระดับสูง",
    "การเงิน",
    "ไอที / คอมพิวเตอร์",
    "การตลาด",
    "ผู้บริหารระดับสูง",
    "เภสัชกร / แพทย์ / สาธารณสุข",
    "วิศวกร",
    "ผู้บริหารระดับสูง"
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
      <div className="slide-grid">
        {currentItems.map((item, index) => (
          <div className="slide-item" key={index}>
            {item}
          </div>
        ))}
      </div>
    );
  };

  return (
    <center>
      <div className="slide-container" style={{backgroundColor: '#fff', marginLeft: '200px', marginRight: '200px'}}>
        <div className="slide-items">
          {renderSlides()}
        </div>
      </div>
      <div className="slide-navigation">
          <div onClick={handlePrev} disabled={currentSlide === 0} style={{backgroundColor: '#fff', width: '50px', height : '50px',borderRadius: '50%', boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.3)'}}>{'<'}</div>
          <div style={{width: '40px'}}></div>
          <div onClick={handleNext} disabled={currentSlide === slideCount - 1} style={{backgroundColor: '#fff', width: '50px', height : '50px',borderRadius: '50%', boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.3)'}}>{'>'}</div>
      </div>
    </center>
  );
};

export default SlidePage;
