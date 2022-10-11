import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios from './api/axios';
import { Navigate } from 'react-router-dom';


export default function Login() {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
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
    else if(navigate && user_type == 'Student'){
        return <Navigate to="/student" />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, pwd);
        try{
            const response = await axios.post('/auth/login', {'email': user, 'password': pwd});
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

            if(response.data.user['user_type'] == 'Student'){
                setUserType('Student');
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
            <div className='login-container'>
                <div className='login-form'>
                    <div className='login-form-title'>Login Form</div>
                    <form onSubmit={handleSubmit}>
                        <div className="login-form-item">
                            <input className="login-input"
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                placeholder="Email"
                                value={user}
                                required
                            />
                        </div>
                        <div className='login-form-item'>
                            <input className="login-input"
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className='login-form-item'>
                            <button className="login-button">Login</button>                      
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
