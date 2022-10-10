import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios, { Axios } from '../api/axios';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function AddCoursePopup(props){

    const userRef = useRef();

    const [course_name, setCourseName] = useState('');
    const [course_code, setCourseCode] = useState('');
    const [course_description, setCourseDescription] = useState('');
    const [errMsg, setErrMsg] = useState('');
    

    const fetchData = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/courses');  
        props.setData(response.data.courses);
    }


        const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(course_name, course_code, course_description);
        try{
            const response = await axios.post(
                'http://127.0.0.1:8000/api/auth/addcourse', 
                {course_name, course_code, course_description},
                {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}});
            console.log(response.status != 200 || response.status != 201);
            fetchData();
        }catch{
            
        }
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
                    onChange={(e) => setCourseName(e.target.value)}
                    value={course_name}
                    placeholder="course name"
                    required
                />
                <input 
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setCourseCode(e.target.value)}
                    value={course_code}
                    placeholder="course code"
                    required
                />
                <input 
                    type="text"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setCourseDescription(e.target.value)}
                    value={course_description}
                    placeholder="description"
                    required
                />
                
                <button onClick={ handleSubmit }>Add</button>
            </div>
        </div>
    ) : '';
}

export default AddCoursePopup;