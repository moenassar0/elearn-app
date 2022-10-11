import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';

export function AdminNavBar() {
  return(
    <>
    <div className='admin-navbar'>
        <Link className='navbar-item' to="/admin/students">
            <div><img className='img-resize' src='../../images/users_icon.svg'></img></div>
            <div className="overflow-text">Students</div>
        </Link>
        <Link className='navbar-item' to="/admin/instructors">
            <div><img className='img-resize' src='../../images/users_icon.svg'></img></div>
            <div className="overflow-text">Instructors</div>
        </Link>
        <Link className='navbar-item' to="/admin/courses">
            <div><img className='img-resize' src='../../images/courses_icon.svg'></img></div>
            <div className="overflow-text">Courses</div>
        </Link>
        <div className='logout-div'>
            <button>Logout</button>
        </div>
    </div>
    </>
  );
}