import React, { useState, useEffect } from 'react';
import RolesList from './RolesList';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Roles() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const navigateToAddUser = ()=>{
    navigate('/add-user');
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/roles',{ withCredentials: true });
        setData(response.data);
      } catch (error) {
        
      } finally {
        
      }
    };
    fetchData();
  }, []);

  return (
    <><Navbar></Navbar><div className="container">
          <h3>Roles List</h3>
          <RolesList data={data} />
      </div></>
  );
}

export default Roles;