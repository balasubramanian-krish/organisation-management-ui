import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const usernameChange = (e) => {
    setUsername(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let requestBody = {
        "username":username,
        "password":password
    };
    try {
    const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
    }).then(response => {
        return response.json();
    }).then(data => {
      setPrevilages(data);
    });
    } catch (error) {
        alert("Invalid Credentials")
    }
  };
  const setPrevilages = (data) => {
    localStorage.setItem('isLoggedIn', "true");
    localStorage.setItem('userEmail', data.email);
    localStorage.setItem('userName', data.name);
    localStorage.setItem('roleName', data.roleName);
    localStorage.setItem('roleId', data.roleId);
    navigate('/dashboard');
  }
  return (
    <div className="container">
      <h1>Login</h1>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" className="form-control" value={username} onChange={usernameChange} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" className="form-control" value={password} onChange={passwordChange} />
        </div>
        <button  onClick={handleLogin}  className="btn btn-primary">Login</button>
    </div>
  );
}

export default Login;
