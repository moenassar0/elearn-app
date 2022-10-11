import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios from '../api/axios';


function ViewAnnouncementPopup(props){
    
    const [announcements, setAnnouncements] = useState([]);
    const [call, setCall] = useState(true);
    const headers = {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}};

    useEffect(() => {
        fetchAnnouncements()
    }, [])

    //Get instructor's assigned courses
    const fetchAnnouncements = async () => {
        setCall(false);
        const response = await axios.post('/auth/announcements', {course_id: props.course_id}, headers);
        if(response.status == 400){
            setCall(true);
            return;
        }
        setAnnouncements(response.data.announcements);
        setCall(true);
    }

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
            {!call && <img className='img-resize' src="../../images/loading-load.gif"></img>}
                <div className='popup-inner-top'><button onClick={() => { props.setTrigger(false)}} className='btn-purple'>Close</button></div>
                <table className="main-table" id="main-table-clients">
                        <tbody>
                            <tr>
                                <th>Announcement</th>
                                <th>Date</th>
                            </tr>
                            {announcements.map((announcement, i) => (
                                <tr key={announcement._id}>
                                    <td>{announcement.announcement_description}</td>
                                    <td>{announcement.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
        </div>
    ) : '';
}

export default ViewAnnouncementPopup;