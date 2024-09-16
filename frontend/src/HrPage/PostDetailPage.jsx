import React, {useEffect} from "react";
import { Link,useParams } from "react-router-dom";
import { Button } from 'react-bootstrap';

import HRNavbar from "../components/navbar/HRNavbar";

const PostDetailPage = () => {
    const { idPost } = useParams();

    useEffect(() => {
        window.scrollTo(0,0);
        //api getPostById


        //load animation
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = globalStyle;
        document.head.appendChild(styleSheet);
    
        // Cleanup on component unmount
        return () => {
          document.head.removeChild(styleSheet);
        };
      }, []);

    return(
        <>
        <HRNavbar/>
        <div style={{height: '100px'}}></div>
        <div className="container" style={Fade}>
            <h5>Full Descriptions</h5>
            <div className='card mt-3 p-4'>
                <h5>Position : </h5>
                <h5>Salary : </h5>
                <h5>Requirements : </h5>
                <h5>Qualifications : </h5>
                <h5>Experience in one or more of the following will be an advantage:</h5>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <p className="mb-1">Working Location: </p>
                    <div style={{width: '250px',display: 'flex',justifyContent: 'space-between'}}>
                        <Link to={'#'}>
                        <Button variant="danger">Edit Post</Button>
                        </Link>
                        <Link to={'#'}>
                            <Button variant="success">Find candidate</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

const Fade = {
    animation: 'fadeInFromBottom 1s ease-in',
  };
  
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

export default PostDetailPage