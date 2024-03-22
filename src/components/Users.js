import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Users() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const navigateToAddUser = ()=>{
    navigate('/add-user');
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/users');
        setData(response.data);
      } catch (error) {
        
      } finally {
        
      }
    };
    fetchData();
  }, []);

  return (
    <><Navbar></Navbar><div className="container">
         <div className="row">
            <div className="col 4">
              <button type="button" onClick={navigateToAddUser} className="btn btn-primary">Add Users</button>
            </div>
        </div>
          <h3>User List</h3>
          <UserList data={data} />
      </div></>
  );
}

export default Users;