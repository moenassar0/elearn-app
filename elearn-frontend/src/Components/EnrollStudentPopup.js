import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios from '../api/axios';

function EnrollStudentPopup(props){

    const [students, setStudents] = useState([]);
    const [selectedStudent, setStudent] = useState(0);
    const [adding, setAdding] = useState(true);
    const headers = {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}};

    const enrollStudent = async (e) => {
        e.preventDefault();
        setAdding(false);
        await axios.post('/auth/enroll', {student_id: selectedStudent, course_id: props.course_id}, headers);
        setAdding(true);
    }

    useEffect(() => {
        fetchData()
    }, [])
    
    //Get list of students
    const fetchData = async () => {
        const response = await axios.get('/auth/students');
        setStudents(response.data.students);
    }
     
    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
            <div className='popup-inner-top'><button onClick={() => { props.setTrigger(false)}} className='btn-purple'>Close</button></div>
            {!adding && <img className='img-resize' src="../../images/loading-load.gif"></img>}
                <select className='select' id="select-student" onChange={(e) => setStudent(e.target.value)}>
                    <option value="0">Select student:</option>
                    {students.map((student, i) => (
                        <option key={i} value={student._id}>{student.f_name + " " + student.l_name}</option>
                                ))}
                </select>
                <button className='btn-purple' onClick={ enrollStudent }>Enroll</button>
            </div>
        </div>
    ) : '';
}

export default EnrollStudentPopup;