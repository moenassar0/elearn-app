import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';

export function StudentNavBar() {
  return(
    <>
    <div className='admin-navbar'>
        <Link className='navbar-item' to="/student/courses">
            <div><img className='img-resize' src='../../images/courses_icon.svg'></img></div>
            <div className="overflow-text">Schedule</div>
        </Link>
        <Link className='navbar-item' to="/student/assignments">
            <div><img className='img-resize' src='../../images/courses_icon.svg'></img></div>
            <div className="overflow-text">Assignments</div>
        </Link>
        <div className='logout-div'>
            <button>Logout</button>
        </div>
    </div>
    </>
  );
}