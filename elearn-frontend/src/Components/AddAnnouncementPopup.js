import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios, { Axios } from '../api/axios';

function AddAnnouncementPopup(props){

    const [announcement, setAnnouncement] = useState('');
    const userRef = useRef();
    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <button onClick={() => { props.setTrigger(false)} }className='close-btn'>Close</button>
                <input 
                    type="text"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setAnnouncement(e.target.value)}
                    value={announcement}
                    placeholder="Announcement Description"
                    required
                />
                
                <button onClick={ handleSubmit }>Add</button>
            </div>
        </div>
    ) : '';
}

export default AddAnnouncementPopup;