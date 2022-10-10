import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios, { Axios } from '../api/axios';

export function InstructorSchedule() {

    const [data, getData] = useState([])

    useEffect(() => {
        fetchSchedule()
    }, [])

    //Get instructor's assigned courses
    const fetchSchedule = async () => {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/studentcourses',
        {_id: }, 
        {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}});
        getData(response.data.courses);
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
                            {data.map((item, i) => (
                                <tr key={item._id}>
                                    <td>{item.course_code}</td>
                                    <td>{item.course_name}</td>
                                    <td>{item.course_description}</td>
                                    <td>
                                        <button>GG</button>
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