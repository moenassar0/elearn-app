import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios from '../api/axios';

export function StudentSchedule() {

    const [courses, setCourses] = useState([])

    useEffect(() => {
        fetchSchedule()
    }, [])

    //Get instructor's assigned courses
    const fetchSchedule = async () => {
        const response = await axios.post('/auth/studentcourses', {});
        setCourses(response.data.courses);
    }
    return (
        <div className='container'>
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
                                        <button>View Annoucements</button>
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