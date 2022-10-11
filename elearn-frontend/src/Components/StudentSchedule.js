import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios from '../api/axios';
import ViewAnnouncementPopup from './ViewAnnouncementPopup';

export function StudentSchedule() {

    const [courses, setCourses] = useState([])
    const [currCourseID, setCurrCourseID] = useState('');
    const [viewAnnouncementButton, setViewAnnouncemenButton] = useState(false);
    const headers = {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}};

    useEffect(() => {
        fetchSchedule()
    }, [])

    //Get instructor's assigned courses
    const fetchSchedule = async () => {
        const response = await axios.post('/auth/studentcourses', {}, headers);
        setCourses(response.data.courses);
    }

    function viewCourseAnnouncements(course_id){
        setCurrCourseID(course_id);
        setViewAnnouncemenButton(true);
    }

    return (
        <div className='container'>
            {viewAnnouncementButton && <ViewAnnouncementPopup course_id={currCourseID} trigger={viewAnnouncementButton} setTrigger={setViewAnnouncemenButton} />}
            <div className="main-header">
                <div className="main-header-title">
                    <span>Check out your schedule</span>
                </div>
                <div className="main-display-table">
                    <table className="main-table" id="main-table-clients">
                        <tbody>
                            <tr>
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                            {courses.map((course) => (
                                <tr key={course._id}>
                                    <td>{course.course_code}</td>
                                    <td>{course.course_name}</td>
                                    <td>{course.course_description}</td>
                                    <td>
                                        <button className='btn-purple' onClick={() => {viewCourseAnnouncements(course._id)}}>View Annoucements</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
  }