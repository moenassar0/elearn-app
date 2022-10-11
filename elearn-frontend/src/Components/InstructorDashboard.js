import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { InstructorNavBar } from './InstructorNavBar';
import axios from '../api/axios';
import { BrowserRouter as Router, Link, Routes, Route, Outlet, Navigate } from 'react-router-dom';

export function InstructorDashboard() {
    const [user_type, setUserType] = useState('Instructor')
    const headers = {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}};

    useEffect(() => {
        fetchUser()
        checkToken()
    }, [])

    function checkToken(){
        if(localStorage.getItem("token") == undefined || localStorage.getItem("token") == ''){
            return <Navigate to="/" />;
        }
    }

    const fetchUser = async () => {
        try{
            const response = await axios.post('/auth/me', {}, headers);
            if(response.status == 400){
                localStorage.setItem("token", '');
                checkToken();
            }
            else
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