import React, { useState, useEffect } from "react";
import Select from "react-select";
import LocationOptions from "../components/LocationOptions";
import JobFieldOptions from "../components/Data/jobField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/navbar/UserNavbar.jsx";
import Swal from 'sweetalert2';

const UserInformation = () => {
  const navigate = useNavigate();
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [location, setLocation] = useState("");
  const [jobField, setJobField] = useState("");


  const [location4Display, setLocation4Display] = useState([]);
  const [jobField4Display, setJobField4Display] = useState([]);

  const [editStatus, setEditStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditButton = async () => {
    setEditStatus(true);
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem("id_user");
    try{
      const response = await axios.patch(`http://localhost:4001/updateInformation/${userId}`,{
        first_name,
        last_name,
        location,
        jobField
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
        
        setFirst_name(response.data.data.first_name);
        setLast_name(response.data.data.last_name);
        setLocation(response.data.data.location);
        setJobField(response.data.data.jobField)

        setLocation4Display({value: response.data.data.location, label: response.data.data.location});
        setJobField4Display({value: response.data.data.jobField, label: response.data.data.jobField});
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
          if (response.data.userData.role != "member") {
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
      <UserNavbar></UserNavbar>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="card" style={fadeIn}>
          <div className="card-header">
            <center>ข้อมูลส่วนตัว</center>
          </div>
          <div className="card-body m-5">
            <div className="d-flex mb-2">
              <p>ชื่อจริง &nbsp;&nbsp;&nbsp;&nbsp;: </p>
              {!editStatus && <p>&nbsp;&nbsp;&nbsp;{first_name}</p>}
              {isLoading && (
                <center>
                  <div style={spinnerStyle}></div>
                </center>
              )}
              {editStatus && (
                <input value={first_name} className="ms-3" style={inputStyle} onChange={(e)=>setFirst_name(e.target.value)}></input>
              )}
            </div>
            <div className="d-flex mb-2">
              <p>นามสกุล &nbsp;: </p>
              {!editStatus && <p>&nbsp;&nbsp;&nbsp;{last_name}</p>}
              {isLoading && (
                <center>
                  <div style={spinnerStyle}></div>
                </center>
              )}
              {editStatus && <input value={last_name} className="ms-3" style={inputStyle} onChange={(e)=>setLast_name(e.target.value)}></input>}
            </div>
            <div className="d-flex mb-2">
              <p>จังหวัด &nbsp;&nbsp;&nbsp;: </p>
              {!editStatus && <p>&nbsp;&nbsp;&nbsp;{location4Display.value}</p>}
              {isLoading && (
                <center>
                  <div style={spinnerStyle}></div>
                </center>
              )}
              {editStatus && (
                <Select
                  className="ms-3"
                  options={LocationOptions}
                  defaultValue={location4Display}
                  styles={{ width: "100%" }}
                  onChange={(e) => setLocation(e.value)}
                />
              )}
            </div>
            <div className="d-flex mb-2">
              <p>สายงาน &nbsp;: </p>
              {!editStatus && <p>&nbsp;&nbsp;&nbsp;{jobField4Display.value}</p>}
              {isLoading && (
                <center>
                  <div style={spinnerStyle}></div>
                </center>
              )}
              {editStatus && (
                <Select
                  className="ms-3"
                  options={JobFieldOptions}
                  defaultValue={jobField4Display}
                  styles={{ width: "100%" }}
                  onChange={(e) => setJobField(e.value)}
                />
              )}
            </div>
            <a href="/ResetPasswordPage">เปลี่ยนรหัสผ่าน</a>
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

export default UserInformation;
