import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route, Navigate, useNavigate} from 'react-router-dom';

export function InstructorNavBar() {

    const navigate = useNavigate();
    
    function logout(){
        localStorage.removeItem("token");
        navigate("/");
    }

    return(
        <>
        <div className='admin-navbar'>
            <Link className='navbar-item' to="/instructor/courses">
                <div><img className='img-resize' src='../../images/courses_icon.svg'></img></div>
                <div className="overflow-text">Schedule</div>
            </Link>
            <div className='logout-div'>
                <button onClick={logout}>Logout</button>
            </div>
        </div>
        </>
    );
}