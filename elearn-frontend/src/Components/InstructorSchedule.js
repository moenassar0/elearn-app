import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios from '../api/axios';
import EnrollStudentPopup from './EnrollStudentPopup';
import ShowEnrolledStudentsPopup from './ShowEnrolledStudentsPopup';
import AddAnnouncementPopup from './AddAnnouncementPopup';
import AddAssignment from './AddAssignmentPopup';

export function InstructorSchedule() {

    const [data, getData] = useState([])
    const [enrollStudentButton, setEnrollStudentButton] = useState(false);
    const [showStudentsButton, setShowStudentsButton] = useState(false);
    const [addAnnouncementButton, setAddAnnouncementButton] = useState(false);
    const [addAssignmentButton, setAddAssignmentButton] = useState(false);
    const [currCourseID, setCurrCourseID] = useState(0);
    const headers = {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}};

    useEffect(() => {
        fetchData();
    }, [])


    //Get instructor's assigned courses
    const fetchData = async () => {
        try{
            const response = await axios.get('/auth/instructorcourses', headers);
            getData(response.data.courses);
        }
        catch{
            
        }
    }

    const startEnrollStudentPopup = (id) => {
        setEnrollStudentButton(true)
        setCurrCourseID(id);
    }

    const showStudentsPopup = (course_id) => {
        setShowStudentsButton(true);
        setCurrCourseID(course_id);
    }

    const addAnnouncementPopup = (course_id) => {
        setAddAnnouncementButton(true);
        setCurrCourseID(course_id);
    }

    const addAssignmentPopup = (course_id) => {
        setAddAssignmentButton(true);
        setCurrCourseID(course_id);
    }

    return (
        <div className='container'>
            {enrollStudentButton && <EnrollStudentPopup course_id={currCourseID} trigger={enrollStudentButton} setTrigger={setEnrollStudentButton} setData={getData}></EnrollStudentPopup>}
            {showStudentsButton && <ShowEnrolledStudentsPopup course_id={currCourseID} trigger={showStudentsButton} setTrigger={setShowStudentsButton}></ShowEnrolledStudentsPopup>}
            <AddAnnouncementPopup course_id={currCourseID} trigger={addAnnouncementButton} setTrigger={setAddAnnouncementButton}></AddAnnouncementPopup>
            <AddAssignment course_id={currCourseID} trigger={addAssignmentButton} setTrigger={setAddAssignmentButton}></AddAssignment>
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
                                        <button className='btn-purple' onClick={() => {addAnnouncementPopup(item._id)}}>Add Announcement</button>
                                        <button className='btn-purple' onClick={() => {startEnrollStudentPopup(item._id)}}>Enroll</button>
                                        <button className='btn-purple' onClick={() => {addAssignmentPopup(item._id)}}>Add Assignment</button>
                                        <button className='btn-purple' onClick={() => {showStudentsPopup(item._id)}}>View Students</button>
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