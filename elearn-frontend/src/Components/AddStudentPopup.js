import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios, { Axios } from '../api/axios';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function AddStudentPopup(props){



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