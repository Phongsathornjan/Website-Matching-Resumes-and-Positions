import React,{ useEffect} from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';

import AdminNavbar from "./AdminNavbar";

const AdminIndexPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        async function authentication() {
          try{
            let token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:4001/auth', {} ,{
              headers: {
                'x-access-token': token
              }
            })
    
            if(response.status == 200){
              if(response.data.userData.role != "admin"){
                navigate('/SignIn');
              }
            }
    
          } catch(err){
            console.log(err)
            navigate('/SignIn');
          }
        }
       
        authentication();

      }, []);

    return(
        <>
        <AdminNavbar></AdminNavbar>
        <Link to="/CreateUser">
            <button>Create User</button>
        </Link>
        </>
    )
}

export default AdminIndexPage

