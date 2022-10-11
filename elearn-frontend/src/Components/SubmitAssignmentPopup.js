import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios from '../api/axios';

function SubmitAssignmentPopup(props){
    const [submission, setSubmission] = useState('');
    const [call, setCall] = useState(true);
    const headers = {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}};

    const handleSubmit = async (e) => {
        setCall(false);
        e.preventDefault();
        const response = await axios.post('auth/submit', {submission, assignment_id: props.assignment_id}, headers);
        console.log(response);
        setCall(true);
    }

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
            {!call && <img className='img-resize' src="../../images/loading-load.gif"></img>}
                <div className='popup-inner-top'>
                    <button onClick={() => { props.setTrigger(false)} } className='btn-purple'>Close</button>
                </div>
                <input 
                    className='login-input'
                    type="text"
                    autoComplete="off"
                    onChange={(e) => setSubmission(e.target.value)}
                    value={submission}
                    placeholder="Your submission..."
                    required
                />
                <button className='btn-purple' onClick={ handleSubmit }>Submit</button>
            </div>
        </div>
    ) : '';
}

export default SubmitAssignmentPopup;