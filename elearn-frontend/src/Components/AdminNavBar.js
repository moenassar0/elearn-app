import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import { Users } from './Users';  

export function AdminNavBar() {
  return(
    <>
    <div className='admin-navbar'>
        <Link className='navbar-item' to="/admin/users">
            <div><img className='img-resize' src='../../images/users_icon.svg'></img></div>
            <div className="overflow-text">Users</div>
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