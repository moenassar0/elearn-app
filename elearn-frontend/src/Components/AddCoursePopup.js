import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios from '../api/axios';

function AddCoursePopup(props){

    const [course_name, setCourseName] = useState('');
    const [course_code, setCourseCode] = useState('');
    const [course_description, setCourseDescription] = useState('');
    const [adding, setAdding] = useState(true);
    
    const fetchData = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/courses');  
        props.setData(response.data.courses);
    }

    const handleSubmit = async (e) => {
        setAdding(false);
        e.preventDefault();
        const response = await axios.post('/auth/addcourse', {course_name, course_code, course_description});
        setAdding(true);
        fetchData();
    }

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
            <div className='popup-inner-top'><button className='btn-purple' onClick={() => { props.setTrigger(false)} }>Close</button></div>
            {!adding && <img className='img-resize' src="../../images/loading-load.gif"></img>}
                <input
                    className='login-input' 
                    type="text"
                    id="username"
                    autoComplete="off"
                    onChange={(e) => setCourseName(e.target.value)}
                    value={course_name}
                    placeholder="course name"
                    required
                />
                <input
                    className='login-input' 
                    type="text"
                    id="username"
                    autoComplete="off"
                    onChange={(e) => setCourseCode(e.target.value)}
                    value={course_code}
                    placeholder="course code"
                    required
                />
                <input
                    className='login-input'
                    type="text"
                    autoComplete="off"
                    onChange={(e) => setCourseDescription(e.target.value)}
                    value={course_description}
                    placeholder="description"
                    required
                />
                
                <button className='btn-purple' onClick={ handleSubmit }>Add</button>
            </div>
        </div>
    ) : '';
}

export default AddCoursePopup;