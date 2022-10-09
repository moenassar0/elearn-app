import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios, { Axios } from '../api/axios';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function AddStudentPopup(props){

    const userRef = useRef();

    const [f_name, setFname] = useState('');
    const [l_name, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    

    const fetchData = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/auth/users');
        console.log(response.data.instructors)
        props.setData(response.data.instructors);
    }


        const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(f_name, l_name, email, pwd);
        try{
            const response = await axios.post(
                'http://127.0.0.1:8000/api/auth/register', 
                {f_name, l_name, email, 'password': pwd, 'user_type': 'Student'} );
            console.log(response.status != 200 || response.status != 201);
            fetchData();
        }catch{
            
        }

        //setUser('');
        //setPwd('');
    }

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <button onClick={() => { props.setTrigger(false)} }className='close-btn'>Close</button>
                <input 
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setFname(e.target.value)}
                    value={f_name}
                    placeholder="f_name"
                    required
                />
                <input 
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setLname(e.target.value)}
                    value={l_name}
                    placeholder="l_name"
                    required
                />
                <input 
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="email"
                    required
                />
                <input 
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    placeholder="password"
                    required
                />
                
                <button onClick={handleSubmit }>Add</button>
            </div>
        </div>
    ) : '';
}

export default AddStudentPopup;