import React, { useState, useEffect} from 'react'
import axios from 'axios';

import Navbar from '../components/navbar/Navbar'
import CompanyList from '../components/CompanyList';
import LocationOptions from '../components/LocationOptions';
import JobFieldOptions from '../components/Data/jobField';
import Select from 'react-select';
import { Form, Button} from 'react-bootstrap';
import SlidePage from '../components/SlidePage';
import Bottombar from './../components/navbar/Bottombar';

import { careerFileContext } from '../context/careerFileContext'
import { JobListContext } from "../context/JobListContext"

function IndexPage() {
  const [jobList,setJobList] = useState("null")

  const [prompt, setPrompt] = useState('null');
  const [location, setLocation] = useState('null');
  const [jobfield, setJobField] = useState('null');

  const SearchButton = async (textSearch, location, jobField) => {
      try{
        const encodedTextSearch = encodeURIComponent(textSearch);
        const encodedLocation = encodeURIComponent(location);
        const encodedJobField = encodeURIComponent(jobField);  
        const response = await axios.get(`http://localhost:4001/getPostBySearch/${encodedTextSearch}/${encodedLocation}/${encodedJobField}`)
        setJobList(response.data)
        console.log(response.data)
      }catch(e){
        console.log(e)
      }
    }

    useEffect(() => {
      if(jobfield != 'null'){
        SearchButton(prompt,location,jobfield)
      }
    }, [jobfield]);

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
          onChange={(e) => setPrompt(e.target.value)}
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
        {jobfield == 'null' ? (
          <Select
          options={JobFieldOptions}
          placeholder="สายอาชีพ"
          styles={{ width: '100%' }}
          onChange={(e) => setJobField(e.value)}
          />
        ):(
          <Select
          options={JobFieldOptions}
          placeholder={jobfield}
          styles={{ width: '100%' }}
          onChange={(e) => setJobField(e.value)}
          />
        )}
        </div>
          <Button variant="btn" id="button-addon2" onClick={() => SearchButton(prompt,location,jobfield)} style={{width: '150px', backgroundColor: '#3769B4', color: '#fff'}}>
            หางาน
          </Button>
    </div>
    {jobList == "null" ? (
        <>
        <careerFileContext.Provider value={[jobfield,setJobField]}>
          <SlidePage></SlidePage>
        </careerFileContext.Provider>
        <center>
        <div><img src="/PleaseSelectFiled.png" style={{marginTop: '60px'}}/></div>
        <div style={{marginTop: '20px'}}><span style={{color: '#828282',fontSize: '48px'}}>&nbsp;&nbsp;&nbsp;&nbsp;กรุณาเลือกสายอาชีพ</span></div>
        </center>
        </>
    ):(
      <JobListContext.Provider value={[jobList,setJobList]}>
        <CompanyList></CompanyList>
      </JobListContext.Provider>
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
