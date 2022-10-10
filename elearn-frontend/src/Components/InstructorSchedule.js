import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios, { Axios } from '../api/axios';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import AddCoursePopup from './AddCoursePopup';
import AssignCoursePopup from './AssignCoursePopup';

export function InstructorSchedule() {

    const [data, getData] = useState([])
    const [addCourseButton, setAddCourseButton] = useState(false);
    const [assignCourseButton, setAssignCourseButton] = useState(false);
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

    return (
        <div className='container'>
            <AddCoursePopup trigger={addCourseButton} setTrigger={setAddCourseButton} setData={getData}>
            </AddCoursePopup>
            <AssignCoursePopup course_id={currCourseID} trigger={assignCourseButton} setTrigger={setAssignCourseButton} setData={getData}>
            </AssignCoursePopup>
            <div className="main-header">
                <div className="main-header-title">
                    <span>Check out your schedule</span>
                    <div className='add-user-btn'>
                        <button onClick={() => {setAddCourseButton(true)}}>+</button>
                    </div>
                </div>
                <div className="main-display-table">
                    <table className="main-table" id="main-table-clients">
                        <tbody>
                            <tr>
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Description</th>
                                <th>Taught By</th>
                                <th>Actions</th>
                            </tr>
                            {data.map((item, i) => (
                                <tr key={item._id}>
                                    <td>{item.course_code}</td>
                                    <td>{item.course_name}</td>
                                    <td>{item.course_description}</td>
                                    <td>{(item.instructor) ? item.instructor.f_name : 'None'}</td>
                                    <td><button>Add Announcement</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
  }