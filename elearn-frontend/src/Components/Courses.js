import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios, { Axios } from '../api/axios';
import AddCoursePopup from './AddCoursePopup';
import AssignCoursePopup from './AssignCoursePopup';
import EditCoursePopup from './EditCoursePopup';

export function Courses() {

    const [data, getData] = useState([])
    const [addCourseButton, setAddCourseButton] = useState(false);
    const [editCourseButton, setEditCourseButton] = useState(false);
    const [assignCourseButton, setAssignCourseButton] = useState(false);
    const [currCourseID, setCurrCourseID] = useState(0);
    const headers = {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}};

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const response = await axios.get('/courses', headers);
        getData(response.data.courses);
    }

    const assignCourseToInstructor = (course_id) => {
        setCurrCourseID(course_id)
        setAssignCourseButton(true)
    }

    const editCourse = (course_id) => {
        setCurrCourseID(course_id)
        setEditCourseButton(true)
    }

    return (
        <div className='container'>
            <AddCoursePopup trigger={addCourseButton} setTrigger={setAddCourseButton} setData={getData}>
            </AddCoursePopup>
            <AssignCoursePopup course_id={currCourseID} trigger={assignCourseButton} setTrigger={setAssignCourseButton} setData={getData}>
            </AssignCoursePopup>
            <EditCoursePopup course_id={currCourseID} trigger={editCourseButton} setTrigger={setEditCourseButton} setData={getData}>
            </EditCoursePopup>
            <div className="main-header">
                <div className="main-header-title">
                    <span>Check out the list of courses</span>
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
                                    <td>
                                        <button className='btn-purple' onClick={ () => {assignCourseToInstructor(item._id)} }>Assign Course</button>
                                        <button className='btn-purple' onClick={ () => {editCourse(item._id)} }>Edit</button>
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