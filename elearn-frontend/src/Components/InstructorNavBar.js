import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import { Users } from './Users';  

export function InstructorNavBar() {
  return(
    <>
    <div className='admin-navbar'>
        <Link className='navbar-item' to="/instructor/courses">
            <div><img className='img-resize' src='../../images/courses_icon.svg'></img></div>
            <div className="overflow-text">Schedule</div>
        </Link>
        <div className='logout-div'>
            <button>Logout</button>
        </div>
    </div>
    </>
  );
}