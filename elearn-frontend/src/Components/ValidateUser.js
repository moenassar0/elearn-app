import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react'
import axios from '../api/axios';

export function ValidateUser(validatingUser, headers) {

    function checkToken(){
        if(localStorage.getItem("token") == undefined || localStorage.getItem("token") == ''){
            window.localStorage.removeItem('token');
            return <Navigate to="/" />;
        }
    }

    const fetchUser = async () => {
        console.log(localStorage.getItem("token"));
            const response = await axios.post('/auth/me', {}, headers);
            console.log(response)
            if(response.status == 400){
                window.localStorage.removeItem('token');
                checkToken();
            }
    }

    fetchUser();

}