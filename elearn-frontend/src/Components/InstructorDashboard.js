import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { InstructorNavBar } from './InstructorNavBar';
import axios, { Axios } from '../api/axios';
import { BrowserRouter as Router, Link, Routes, Route, Outlet, Navigate } from 'react-router-dom';

export function InstructorDashboard() {
    const [user_type, setUserType] = useState('Instructor')
    useEffect(() => {
        fetchUser()
    }, [])

    if(localStorage.getItem("token") == undefined || localStorage.getItem("token") == ''){
        return <Navigate to="/" />;
    }

    const fetchUser = async () => {
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/auth/me', 
            {}, { headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}});
            setUserType(response.data['user_type']);
        }catch{
            setUserType('');
        }
    }

    if(user_type != 'Instructor'){
        return <Navigate to="/" />;
    }

  return(
    <>
        <InstructorNavBar />
        <Outlet />
    </>
  );
}