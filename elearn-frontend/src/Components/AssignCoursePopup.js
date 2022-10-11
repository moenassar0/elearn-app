import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios, { Axios } from '../api/axios';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function AssignCoursePopup(props){

    const [instructors, setInstructors] = useState([]);
   const [selectedInstructor, setInstructor] = useState(0);
    const assignInstructor = async (e) => {
        e.preventDefault();
        console.log(props.course_id, selectedInstructor);
        try{
            const response = await axios.post(
                'http://127.0.0.1:8000/api/auth/assigncourse', 
                {instructor_id: selectedInstructor, course_id: props.course_id},
                {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}});
            console.log(response.status != 200 || response.status != 201);
            fetchCourses();
        }
        catch{
        }
    } 

    /*const [data, getData] = useState([])
    const [addCourseButton, setAddCourseButton] = useState(false);
    */
    useEffect(() => {
        fetchData()
    }, [])
    
    //Get list of instructors
    const fetchData = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/auth/instructors');
        console.log(response.data.instructors)
        setInstructors(response.data.instructors);
    }

    const fetchCourses = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/courses');
        props.setData(response.data.courses);
    }      

//<select id="select-voucher" class="">
//<option value="0">Select instructor:</option>
//</select>
//<option value="${voucher.code}">${voucher.code} : ${voucher.amount}$</option>
    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
            <div className='popup-inner-top'><button className='btn-purple' onClick={() => { props.setTrigger(false)} }>Close</button></div>
                <select className='select' id="select-instructor" onChange={(e) => setInstructor(e.target.value)}>
                    <option value="0">Select instructor:</option>
                    {instructors.map((instructor, i) => (
                        <option key={i} value={instructor._id}>{instructor.f_name + " " + instructor.l_name}</option>
                                ))}
                </select>
                <button className='btn-purple' onClick={ assignInstructor }>Assign</button>
            </div>
        </div>
    ) : '';
}

export default AssignCoursePopup;