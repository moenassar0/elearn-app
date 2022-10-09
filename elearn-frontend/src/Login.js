import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios, { Axios } from './api/axios';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';


export default function Login() {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [isAdmin, setAdmin] = useState(false);
    const [user_type, setUserType] = useState('');
    

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const [navigate, setNavigate] = useState(false);

    if(navigate && user_type == 'Admin'){
        return <Navigate to="/admin" />;
    }
    else if(navigate && user_type == 'Instructor'){
        return <Navigate to="/instructor" />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, pwd);
        try{
            const response = await axios.post(
                'http://127.0.0.1:8000/api/auth/login', 
                {'email': user, 'password': pwd} );
            console.log(response.data.user['user_type']);
            if(response.data.user['user_type'] == 'Admin'){
                setUserType('Admin');
                const token = response.data.token.original['access_token'];
                localStorage.setItem("token", token)
                setNavigate(true);
            }

            if(response.data.user['user_type'] == 'Instructor'){
                setUserType('Instructor');
                const token = response.data.token.original['access_token'];
                localStorage.setItem("token", token)
                setNavigate(true);
            }

        }catch{
            
        }

        setUser('');
        setPwd('');
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'> Username: </label>
                <input 
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <label htmlFor='password'>Password: </label>
                <input 
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
            </form>
        </section>
  )


}

//Login.propTypes = {
  //  setToken: PropTypes.func.isRequired
  //}
