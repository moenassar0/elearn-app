import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios from '../api/axios';

function EditCoursePopup(props){

    const [course_code, setCode] = useState('');
    const [course_name, setName] = useState('');
    const [course_description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('auth/course/update', {course_id: props.course_id, course_code, course_name, course_description});
        const response = await axios.get('/courses');
        props.setData(response.data.courses);
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
                    onChange={(e) => setCode(e.target.value)}
                    value={course_code}
                    placeholder="Course Code"
                    required
                />
                <input 
                    className='login-input'
                    type="text"
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                    value={course_name}
                    placeholder="Course Name"
                    required
                />
                <input 
                    className='login-input'
                    type="text"
                    autoComplete="off"
                    onChange={(e) => setDescription(e.target.value)}
                    value={course_description}
                    placeholder="Description"
                    required
                />
                <button className='btn-purple' onClick={ handleSubmit }>Update</button>
            </div>
        </div>
    ) : '';
}

export default EditCoursePopup;