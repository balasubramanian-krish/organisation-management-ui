import React from 'react';
import { useNavigate } from 'react-router-dom';
function Navbar(props) {
    const navigate = useNavigate();
    const username = localStorage.userName;
    const roleId = localStorage.roleId;
    const onLogout = async (e) => {
        try {
            const response = await fetch('http://localhost:3000/auth/logout', {
            method: 'GET',
            });
            if (!response.ok) {
            throw new Error('some thing went wrong');
            }
            localStorage.setItem('isLoggedIn', "false");
            navigate('/');
        } catch (error) {
            alert("Invalid Credentials");
            console.error('Error:', error.message);
        }
    };
    const navigateToUsers = () => {
        navigate('/users');
    }
    return (
        <><nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {roleId === '1' ? (
                        <><li className="nav-item">
                                <button className="nav-link active" aria-current="page">Roles</button>
                            </li><li className="nav-item">
                                    <button className="nav-link" onClick={navigateToUsers}>Users</button>
                                </li></>
                        ) : (<></>)}
                    </ul>
                    <span className="navbar-text">Welcome, {username}! </span>
                    <button className="btn btn-outline-danger" onClick={onLogout}>Logout</button>
                </div>
            </div>
        </nav></>
    );
}

export default Navbar;
