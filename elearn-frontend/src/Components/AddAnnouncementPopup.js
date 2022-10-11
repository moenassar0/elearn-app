import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios from '../api/axios';

function AddAnnouncementPopup(props){

    const [announcement, setAnnouncement] = useState('');
    const [adding, setAdding] = useState(true);
    const userRef = useRef();
    const headers = {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}};

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAdding(false);
        await axios.post('/auth/announcement', {course_id: props.course_id, announcement_description: announcement}, headers);
        setAdding(true);
    }

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
            <div className='popup-inner-top'><button onClick={() => { props.setTrigger(false)}} className='btn-purple'>Close</button></div>
                {!adding && <img className='img-resize' src="../../images/loading-load.gif"></img>}
                <input
                    className='login-input' 
                    type="text"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setAnnouncement(e.target.value)}
                    value={announcement}
                    placeholder="Announcement Description"
                    required
                />
                
                <button className='btn-purple' onClick={ handleSubmit }>Add</button>
            </div>
        </div>
    ) : '';
}

export default AddAnnouncementPopup;