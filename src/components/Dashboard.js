import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
function Dashboard(props) {
    const navigate = useNavigate();
    const redirectToHome = () => {
        if(localStorage.isLoggedIn !== "true") {
            window.location.href = 'http://localhost:3001/';
            navigate('/');
        }
    }
    redirectToHome()
    return (
        <><Navbar></Navbar><main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Dashboard</h1>
                </div>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.


            </main></>
    );
}

export default Dashboard;
