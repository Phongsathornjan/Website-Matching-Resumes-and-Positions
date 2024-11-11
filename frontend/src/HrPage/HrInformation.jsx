import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HRNavbar from "../components/navbar/HRNavbar";
import Swal from 'sweetalert2';

const HrInformation = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [companyDetail, setCompanyDetail] = useState("");


  const [editStatus, setEditStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditButton = async () => {
    setEditStatus(true);
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem("id_user");
    try{
      const response = await axios.patch(`http://localhost:4001/updateInformation/${userId}`,{
        companyName,
        companyDetail,
      })
      if (response.status === 200) {
        Swal.fire({
            title: 'สำเร็จ!',
            text: 'ข้อมูลของคุณได้รับการอัพเดตแล้ว.',
            icon: 'success',
            confirmButtonText: 'ตกลง'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });          
      }
    }catch(e){
      console.log(e)
      Swal.fire({
        title: 'Error!',
        text: 'Internal Server Error',
        icon: 'warning', 
        confirmButtonText: 'ตกลง'
      });
    }
  };

  const getInformation = async () => {
    const userId = localStorage.getItem("id_user");
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:4001/getInformation/${userId}`
      );
      if (response.status == 200) {
        console.log(response)
        setCompanyName(response.data.data.companyName);
        setCompanyDetail(response.data.data.companyDetail);
      }
      setIsLoading(false);
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: 'มีบางอย่างผิดพลาด',
        icon: 'warning', 
        confirmButtonText: 'ตกลง'
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInformation();
  }, []);

  useEffect(() => {
    async function authentication() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:4001/auth",
          {},
          {
            headers: {
              "x-access-token": token,
            },
          }
        );

        if (response.status == 200) {
          if (response.data.userData.role != "hr") {
            navigate("/SignIn");
          }
        } else {
          navigate("/SignIn");
        }
      } catch (err) {
        console.log(err);
        navigate("/SignIn");
      }
    }

    authentication();
  }, []);

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
    <>
      <HRNavbar/>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="card" style={fadeIn}>
          <div className="card-header">
            <center>ข้อมูลส่วนตัว</center>
          </div>
          <div className="card-body m-5">
            <div className="d-flex mb-2">
              <div style={{width: '140px'}}><p>ชื่อบริษัท &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </p></div>
              {!editStatus && <p>{companyName}</p>}
              {isLoading && (
                <center>
                  <div style={spinnerStyle}></div>
                </center>
              )}
              {editStatus && (
                <input value={companyName} className="ms-3" style={inputStyle} onChange={(e)=>setCompanyName(e.target.value)}></input>
              )}
            </div>
            <div className="d-flex mb-2">
              <div style={{width: '140px'}}><p>รายละเอียด &nbsp;&nbsp;: </p></div>
              {!editStatus && <p className="ms-2">{companyDetail}</p>}
              {isLoading && (
                <center>
                  <div style={spinnerStyle}></div>
                </center>
              )}
              {editStatus && <textarea value={companyDetail} className="ms-5" style={inputStyle} rows="4" cols="180" onChange={(e)=>setCompanyDetail(e.target.value)}></textarea>}
            </div>
            <div className="mt-5">
              <button className="btn btn-danger" onClick={handleEditButton}>
                แก้ไขข้อมูล
              </button>
              {editStatus && (
                <button className="btn btn-success ms-5" onClick={handleSubmit}>ยืนยัน</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const globalStyle = `
@keyframes fadeInFromBottom {
  0% {
    opacity: 0;
    transform: translateY(20px); 
  }
  100% {
    opacity: 1;
    transform: translateY(0); 
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

`;

const fadeIn = {
  animation: "fadeInFromBottom 0.6s ease-in",
};

const spinnerStyle = {
  border: "4px solid rgba(0, 0, 0, 0.1)",
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  borderLeftColor: "#09f",
  animation: "spin 1s ease infinite",
  marginBottom: "30px",
};

const inputStyle = {
  borderRadius: '5px',
  border: "1px solid rgba(128, 128, 128, 0.4)"
}

export default HrInformation;
