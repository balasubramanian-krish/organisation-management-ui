import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
function EditUser({ data }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [options, setOptions] = useState([]);
  const [roles, setRoles] = useState('');
  const [errors, setErrors] = useState({});
  const handleNameChange = (event) => {
    setName(event.target.value);
    errors.name = '';
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    errors.email = '';
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const pStyle = {
    display: 'none'
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/users/'+id);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setRoles(response.data.roles[0]);
        fetchRoles();
      } catch (error) {
        
      } finally {
        
      }
    };
    fetchData();
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/roles');
        setOptions(response.data);
      } catch (error) {
        
      } finally {
        
      }
    };
    
  }, []);
  const onSaveUser = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      let requestBody = {
        "name":name,
        "email":email,
        "phone":phone,
        "id":id,
        "roles": document.querySelector("#role").value
      };
      try {
        await fetch('http://localhost:3000/auth/users', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
          }).then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            navigate('/users');
          })
      } catch (error) {
          alert("User already Exist")
      }
    } else {
      setErrors(errors);
    }
  };
  const validateForm = () => {
    let errors = {};
    if (name.trim() === "") {
      errors.name = 'Name is required';
    }
    if (email.trim() === "") {
      debugger
      errors.email = 'Email is required';
    }
    if (email.trim() !== "") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(regex.test(email) === false) {
        errors.email = 'Email is not valid';
      }
    }
    return errors;
  };
  return (<><Navbar></Navbar><div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="card">
          <div className="card-header">
            User Registration
          </div>
          <div className="card-body">
            <form className="form-horizontal">
              <div className="form-group">
                <label className="control-label" for="name">Name</label>
                <input type="text" className="form-control"  value={name} onChange={handleNameChange} id="name" placeholder="Enter Name" />
                {errors.name && <div className="error">{errors.name}</div>}
              </div>
              <div className="form-group">
                <label className="control-label" for="name">Role</label>
                <select name="role"  id="role" className="form-control">
                  {options.map(option => (
                    <option selected={roles === option._id}  key={option._id} value={option._id}>{option.name}</option>
                  ))}
              </select>
              <p style={pStyle}>{roles}</p>
              </div>
              <div className="form-group">
                <label for="email">Email address</label>
                <input type="email" className="form-control" value={email} id="email" placeholder="Enter email" onChange={handleEmailChange} />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>
              <div className="form-group">
                <label className="control-label" for="phone">Phone</label>
                <input type="text" className="form-control" value={phone}  id="phone" placeholder="Enter Phone" onChange={handlePhoneChange} />
              </div>
              <div className="form-group">
                <button type="submit" onClick={onSaveUser} className="btn btn-primary form-control">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div></>);
}

export default EditUser;
