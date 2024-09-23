import React from "react";
import { useNavigate } from "react-router-dom";
const AdminNavbar = () => {
    const navigate = useNavigate();

    const SignOut = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('id_user');
        navigate('/SignIn');
      }

    return(
        <>
        <button onClick={SignOut}>Sing Out</button>
        </>
    )
}

export default AdminNavbar