import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
function AddUser({ data }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [options, setOptions] = useState([]);
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const trackRole = (event) => {
    
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
    errors.name = '';
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    errors.email = '';
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    errors.password = '';
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    errors.confirmPassword = '';
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/roles',{ withCredentials: true });
        setOptions(response.data);
      } catch (error) {
        
      } finally {
        
      }
    };
    fetchData();
  }, []);
  const onSaveUser = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      let requestBody = {
        "name":name,
        "email":email,
        "password":password,
        "phone":phone,
        "roles": document.querySelector("#role").value
      } ;
      try {
        await fetch('http://localhost:3000/auth/users', {
          method: 'POST',
          credentials: 'include',
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
      errors.email = 'Email is required';
    }
    if (email.trim() !== "") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(regex.test(email) === false) {
        errors.email = 'Email is not valid';
      }
    }
    if (password.trim() === "") {
      errors.password = 'Password is required';
    }
    if (confirmPassword.trim() === "") {
      errors.confirmPassword = 'Confirm Password is required';
    }
    if (password.trim() !== "" && confirmPassword.trim() !== "") {
        if(password !== confirmPassword) {
          errors.confirmPassword = 'Password and confirm password does not match';
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
                <select name="role" id="role" className="form-control" onChange={trackRole}>
                  {options.map(option => (
                    <option key={option._id} value={option._id}>{option.name}</option>
                  ))}
              </select>

              </div>
              <div className="form-group">
                <label for="email">Email address</label>
                <input type="email" className="form-control" value={email} id="email" placeholder="Enter email" onChange={handleEmailChange} />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>
              <div className="form-group">
                <label for="password">Password</label>
                <input type="password" className="form-control" value={password} id="password" placeholder="Password" onChange={handlePasswordChange}/>
                {errors.password && <div className="error">{errors.password}</div>}
              </div>
              <div className="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" className="form-control" value={confirmPassword} id="confirmPassword" placeholder="Confirm Password" onChange={handleConfirmPasswordChange} />
                {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
              </div>
              <div className="form-group">
                <label className="control-label" for="phone">Phone</label>
                <input type="text" className="form-control" value={phone}  id="phone" placeholder="Enter Phone" onChange={handlePhoneChange} />
              </div>
              <div className="form-group">
                <button type="submit" onClick={onSaveUser} className="btn btn-primary form-control">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div></>);
}

export default AddUser;
