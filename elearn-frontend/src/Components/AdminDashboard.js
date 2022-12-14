import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { AdminNavBar } from './AdminNavBar';
import axios from '../api/axios';
import { BrowserRouter as Router, Link, Routes, Route, Outlet, Navigate } from 'react-router-dom';

export function AdminDashboard() {

    const [user_type, setUserType] = useState('Admin')
    const headers = {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}};

    useEffect(() => {
        fetchUser()
    }, [])

    if(localStorage.getItem("token") == undefined || localStorage.getItem("token") == ''){
        return <Navigate to="/" />;
    }

    const fetchUser = async () => {
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/auth/me', 
            {}, headers);
            setUserType(response.data['user_type']);
        }catch{
            setUserType('');
        }
    }

    if(user_type != 'Admin'){
        return <Navigate to="/" />;
    }

  return(
    <>
        <AdminNavBar />
        <Outlet />
    </>
  );
}