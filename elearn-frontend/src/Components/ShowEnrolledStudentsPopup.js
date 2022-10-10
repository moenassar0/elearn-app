import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios, { Axios } from '../api/axios';
import PropTypes from 'prop-types';

function ShowEnrolledStudentsPopup(props){
    
    const [studentsData, setStudentsData] = useState([]);

    useEffect(() => {
        fetchStudentData()
    }, [])

    //Get instructor's assigned courses
    const fetchStudentData = async () => {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/enrolled',
        {course_id: props.course_id}, 
        {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}});
        //console.log(props.course_id);
        setStudentsData(response.data.students);
    }

    //fetchStudentData();

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <button onClick={() => { props.setTrigger(false)} }className='close-btn'>Close</button>
                <table className="main-table" id="main-table-clients">
                        <tbody>
                            <tr>
                                <th>Student Names</th>
                            </tr>
                            {studentsData.map((item, i) => (
                                <tr key={item._id}>
                                    <td>{item.f_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
        </div>
    ) : '';
}

export default ShowEnrolledStudentsPopup;