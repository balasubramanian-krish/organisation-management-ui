import React from 'react';
import { useNavigate } from 'react-router-dom';
function UserDashboard(props) {
    const username = localStorage.userName;
    const navigate = useNavigate();
    if(localStorage.roleId !== "2"){
        navigate('/dashboard');
    }
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
    return (
        <><><nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"></a>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    </ul>
                    <span className="navbar-text">Welcome, {username}! </span>
                    <button className="btn btn-outline-danger" onClick={onLogout}>Logout</button>
                </div>
            </div>
        </nav></><main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Dashboard</h1>
                </div>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </main></>
    );
}

export default UserDashboard;
