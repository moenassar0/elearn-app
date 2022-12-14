import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios from '../api/axios';

function EditUserPopup(props){
    const [f_name, setFname] = useState('');
    const [l_name, setLname] = useState('');
    const headers = {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}};

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('auth/user/update', {id: props.user_id, f_name, l_name}, headers);
        fetchData();
    }

    const fetchData = async () => {
        if(props.editing == 'Student'){
            const response = await axios.get('/auth/students');
            console.log(response.data.students)
            props.setData(response.data.students);
        }
        else if(props.editing == 'Instructor'){
            const response = await axios.get('/auth/instructors');
            console.log(response.data.instructors)
            props.setData(response.data.instructors);
        }
    }

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <div className='popup-inner-top'>
                    <button onClick={() => { props.setTrigger(false)} } className='btn-purple'>Close</button>
                </div>
                <input 
                    className='login-input'
                    type="text"
                    autoComplete="off"
                    onChange={(e) => setFname(e.target.value)}
                    value={f_name}
                    placeholder="First Name"
                    required
                />
                <input 
                    className='login-input'
                    type="text"
                    autoComplete="off"
                    onChange={(e) => setLname(e.target.value)}
                    value={l_name}
                    placeholder="Last Name"
                    required
                />
                <button className='btn-purple' onClick={ handleSubmit }>Update</button>
            </div>
        </div>
    ) : '';
}

export default EditUserPopup;