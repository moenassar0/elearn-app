import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import { Users } from './Users';  

export function AdminNavBar() {
    console.log(window.location);
  return(
    <>
    <div className='admin-navbar'>
        <div className='navbar-item'>
            
                <div ><img className='img-resize' src='../../images/users_icon.svg'></img></div>
                <div><Link className='navbar-item-link' to="/admin/users">Users</Link></div>
            
        </div>
        <div className='navbar-item'>
        <div ><img className='img-resize' src='../../images/courses_icon.svg'></img></div>
            <div><Link className='navbar-item-link' to="/admin/courses">Courses</Link></div>
        </div>
        <div className='logout-div'>
            <button>Logout</button>
        </div>
    </div>
    </>
  );
}