import React, { useState} from 'react'
import Navbar from '../components/navbar/Navbar'
import CompanyList from '../components/CompanyList';
import LocationOptions from '../components/LocationOptions';
import JobFieldOptions from '../components/JobFieldOptions';
import Select from 'react-select';
import { Form, Button} from 'react-bootstrap';
import SlidePage from '../components/SlidePage';
import Bottombar from './../components/navbar/Bottombar';

function IndexPage() {
  const [prompt, setPrompt] = useState('');
  const [location, setLocation] = useState('Bangkok');
  const [jobfield, setJobField] = useState('IT');

  return (
    <div style={{
      backgroundColor: '#fff',
    }}>
    <Navbar></Navbar>
    <div style={{height: '60px'}}></div>
    <div style={formStyle}>

        <Form.Control
          placeholder="อธิบายงานที่เหมาะกับคุณให้เราฟังสิ   ?"
          style={inputStyle}
          onChange={(e) => setPrompt(e.value)}
        />
        <div style={{width: '240px'}}>
        <Select
                options={LocationOptions}
                placeholder="พื้นที่ทำงาน"
                styles={{ width: '100%' }}
                onChange={(e) => setLocation(e.value)}
        />
        </div>
        <div style={{width: '240px'}}>
        <Select
                options={JobFieldOptions}
                placeholder="สายอาชีพ"
                styles={{ width: '100%' }}
                onChange={(e) => setJobField(e.value)}
        />
        </div>

        <Button variant="btn" id="button-addon2" style={{width: '150px', backgroundColor: '#3769B4', color: '#fff'}}>
          หางาน
        </Button>
    </div>
    {jobfield ? (
        <>
        <SlidePage></SlidePage>
        <center>
        <div><img src="../../public/PleaseSelectFiled.png" style={{marginTop: '60px'}}/></div>
        <div style={{marginTop: '20px'}}><span style={{color: '#828282',fontSize: '48px'}}>&nbsp;&nbsp;&nbsp;&nbsp;กรุณาเลือกสายอาชีพ</span></div>
        </center>
        </>
    ):(
      <CompanyList></CompanyList>
    )}
    <div style={{height: '200px'}}></div>
    <Bottombar></Bottombar>
    </div>
  )
}

  const inputStyle = {
    width: '700px' 
  };

  const formStyle = {
    display: 'flex',
    margin: '40px',
    marginLeft: '200px',
    marginRight: '200px',
    justifyContent: 'space-between',
    gap: '20px' 
  };

export default IndexPage
