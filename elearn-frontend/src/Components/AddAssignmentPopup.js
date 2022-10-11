import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios, { Axios } from '../api/axios';

function AddAssignment(props){

    const [assignment, setAssingment] = useState('');
    const [date, setDate] = useState('');

    const [adding, setAdding] = useState(true);
    const userRef = useRef();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setAdding(false);
        const response = await axios.post(
            'http://127.0.0.1:8000/api/auth/assignment', 
            {course_id: props.course_id, assignment_description: assignment, date},
            {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}});
        console.log(response.status != 200 || response.status != 201);
        console.log(response);
        setAdding(true);
    }

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
            <div className='popup-inner-top'><button onClick={() => { props.setTrigger(false)}} className='btn-purple'>Close</button></div>
                {!adding && <img className='img-resize' src="../../images/loading-load.gif"></img>}
                <input 
                    type="text"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setAssingment(e.target.value)}
                    value={assignment}
                    placeholder="Assignment Description"
                    required
                />
                <input 
                    type="text"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    placeholder="Date"
                    required
                />
                
                <button onClick={ handleSubmit }>Add</button>
            </div>
        </div>
    ) : '';
}

export default AddAssignment;