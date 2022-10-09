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
            setErrMsg('');

        }catch{
            setErrMsg('Wrong credentials!');
        }

        setUser('');
        setPwd('');
    }

    return (
        <section>
            <div className="top-title"><h1>Login</h1></div>
            <div className='login-container'>
            <div className='login-form'>
                <form onSubmit={handleSubmit}>
                    <div class="login-form-item">
                        <div className="login-label"><label htmlFor='username'> Email: </label></div>
                        <input className="width-adjust"
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                    </div>
                    <div className='login-form-item'>
                        <div className="login-label"><label htmlFor='password'>Password: </label></div>
                        <input className="width-adjust"
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                    </div>
                    <div class='login-form-item'>
                        <button>Sign In</button>                      
                    </div>
                </form>
                <div className='login-form-item'>
                    <p>{errMsg}</p>
                </div>
            </div>
            </div>

        </section>
  )


}

//Login.propTypes = {
  //  setToken: PropTypes.func.isRequired
  //}
