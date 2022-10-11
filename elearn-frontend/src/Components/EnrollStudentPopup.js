import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios, { Axios } from '../api/axios';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function EnrollStudentPopup(props){

    const [students, setStudents] = useState([]);
    const [selectedStudent, setStudent] = useState(0);
    const [adding, setAdding] = useState(true);

    const enrollStudent = async (e) => {
        e.preventDefault();
        console.log(props.course_id, selectedStudent);
        try{
            setAdding(false);
            const response = await axios.post(
                'http://127.0.0.1:8000/api/auth/enroll', 
                {student_id: selectedStudent, course_id: props.course_id},
                {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}});
            console.log(response.status != 200 || response.status != 201);
            setAdding(true);
        }
        catch{
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    
    //Get list of students
    const fetchData = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/auth/users');
        setStudents(response.data.instructors);
    }
     
    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
            <div className='popup-inner-top'><button onClick={() => { props.setTrigger(false)}} className='btn-purple'>Close</button></div>
            {!adding && <img className='img-resize' src="../../images/loading-load.gif"></img>}
                <select id="select-student" onChange={(e) => setStudent(e.target.value)}>
                    <option value="0">Select instructor:</option>
                    {students.map((student, i) => (
                        <option key={i} value={student._id}>{student.f_name + " " + student.l_name}</option>
                                ))}
                </select>
                <button onClick={ enrollStudent }>Enroll</button>
            </div>
        </div>
    ) : '';
}

export default EnrollStudentPopup;