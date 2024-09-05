import React, { useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import CompanyList from '../components/CompanyList';
import LocationOptions from '../components/LocationOptions';
import JobFieldOptions from '../components/JobFieldOptions';
import Select, { components } from 'react-select';
import { Form, Button } from 'react-bootstrap';
import SlidePage from '../components/SlidePage';
import Bottombar from './../components/navbar/Bottombar';

function IndexPage() {
  const [prompt, setPrompt] = useState('');
  const [selectedLocation, setSelectedLocation] = useState([]); 
  const [selectedJobFields, setSelectedJobFields] = useState([]); 

  // Handle location change
  const handleLocationChange = (selectedOptions) => {
    setSelectedLocation(selectedOptions || []); 
  };

  // Handle job field change
  const handleJobFieldChange = (selectedOptions) => {
    setSelectedJobFields(selectedOptions || []); 
  };


  const customStyles = {
    multiValue: (base, state) => {
      if (state.index > 0) return { ...base, display: 'none' }; 
      return base;
    },
    multiValueLabel: (base, state) => {
      if (state.index > 0) return { ...base, display: 'none' };
      return base;
    },
    control: (base) => ({
      ...base,
      width: '100%',
    }),
  };

  return (
    <div style={{ backgroundColor: '#EBF2EE' }}>
      <Navbar />
      <div style={{ height: '60px' }}></div>
      <div style={formStyle}>
        <Form.Control
          placeholder="อธิบายงานที่เหมาะกับคุณให้เราฟังสิ   ?"
          style={inputStyle}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div style={{ width: '320px' }}>
          <Select
            options={LocationOptions}
            placeholder="พื้นที่ทำงาน"
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            onChange={handleLocationChange}
            value={selectedLocation}
            styles={customStyles} 
          />
        </div>
        <div style={{ width: '330px' }}>
          <Select
            options={JobFieldOptions}
            placeholder="สายอาชีพ"
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            onChange={handleJobFieldChange}
            value={selectedJobFields}
            styles={customStyles}
          />
        </div>
        <Button
          variant="btn"
          id="button-addon2"
          style={{
            width: '150px',
            backgroundColor: '#3769B4',
            color: '#fff',
          }}
        >
          หางาน
        </Button>
      </div>
      <SlidePage />
        <>
          <center>
            <div>
              <img src="./public/PleaseSelectFiled.png" style={{ marginTop: '60px' }} />
            </div>
            <div style={{ marginTop: '20px' }}>
              <span style={{ color: '#828282', fontSize: '48px' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;กรุณาเลือกสายอาชีพ
              </span>
            </div>
          </center>
        </>
      <div style={{ height: '200px' }}></div>
      <Bottombar />
    </div>
  );
}

const inputStyle = {
  width: '550px',
};

const formStyle = {
  display: 'flex',
  margin: '40px',
  marginLeft: '150px',
  marginRight: '150px',
  justifyContent: 'space-between',
  gap: '20px',
};

export default IndexPage;
