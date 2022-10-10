import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios, { Axios } from '../api/axios';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import EnrollStudentPopup from './EnrollStudentPopup';
import ShowEnrolledStudentsPopup from './ShowEnrolledStudentsPopup';

export function InstructorSchedule() {

    const [data, getData] = useState([])
    const [enrollStudentButton, setEnrollStudentButton] = useState(false);
    const [showStudentsButton, setShowStudentsButton] = useState(false);
    const [currCourseID, setCurrCourseID] = useState(0);

    useEffect(() => {
        fetchData()
    }, [])

    //Get instructor's assigned courses
    const fetchData = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/auth/instructorcourses', 
        {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}});
        getData(response.data.courses);
    }

    const startEnrollStudentPopup = (id) => {
        setEnrollStudentButton(true)
        setCurrCourseID(id);
    }

    const showStudentsPopup = (course_id) => {
        setShowStudentsButton(true);
        setCurrCourseID(course_id);
    }

    return (
        <div className='container'>
            <EnrollStudentPopup course_id={currCourseID} trigger={enrollStudentButton} setTrigger={setEnrollStudentButton} setData={getData}>

            </EnrollStudentPopup>
            <ShowEnrolledStudentsPopup course_id={currCourseID} trigger={showStudentsButton} setTrigger={setShowStudentsButton}>

            </ShowEnrolledStudentsPopup>
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
                            {data.map((item, i) => (
                                <tr key={item._id}>
                                    <td>{item.course_code}</td>
                                    <td>{item.course_name}</td>
                                    <td>{item.course_description}</td>
                                    <td>
                                        <button>Add Announcement</button>
                                        <button onClick={() => {startEnrollStudentPopup(item._id)}}>Enroll</button>
                                        <button>Add Assignment</button>
                                        <button onClick={() => {showStudentsPopup(item._id)}}>View Students</button>
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