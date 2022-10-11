import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios from '../api/axios';

function EditUserPopup(props){

    const userRef = useRef();

    const [f_name, setFname] = useState('');
    const [l_name, setLname] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('auth/user/update', {id: props.user_id, f_name, l_name});
        console.log(response.status != 200 || response.status != 201);
        //fetchData();
    }

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <div className='popup-inner-top'>
                    <button onClick={() => { props.setTrigger(false)} }className='close-btn'>Close</button>
                </div>
                <input 
                    type="text"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setFname(e.target.value)}
                    value={f_name}
                    placeholder="First Name"
                    required
                />
                <input 
                    type="text"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setLname(e.target.value)}
                    value={l_name}
                    placeholder="Last Name"
                    required
                />
                <button onClick={ handleSubmit }>Update</button>
            </div>
        </div>
    ) : '';
}

export default EditUserPopup;