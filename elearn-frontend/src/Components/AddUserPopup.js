import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios from '../api/axios';

function AddStudentPopup(props){

    const userRef = useRef();

    const [f_name, setFname] = useState('');
    const [l_name, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const headers = {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}};

    const fetchData = async () => {
        if(props.adding == 'Student'){
            const response = await axios.get('/auth/students');
            console.log(response.data.students)
            props.setData(response.data.students);
        }
        else if(props.adding == 'Instructor'){
            const response = await axios.get('/auth/instructors');
            console.log(response.data.instructors)
            props.setData(response.data.instructors);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user_type = props.adding;
        const response = await axios.post('/auth/register', {f_name, l_name, email, 'password': pwd, user_type}, headers);
        fetchData();
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
                
                <button onClick={ handleSubmit }>Add</button>
            </div>
        </div>
    ) : '';
}

export default AddStudentPopup;