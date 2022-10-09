import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios, { Axios } from '../api/axios';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

export function Courses() {

    const [data, getData] = useState([])
 
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/courses');
        console.log(response.data.courses)
        getData(response.data.courses);
    }

    return (
        <div className='container'>
            <div className="main-header">
                <span className="main-header-title">
                    Check out the list of courses
                </span>
                <div className="main-buttons">

                </div>
                <div className="main-display-table">
                    <table className="main-table" id="main-table-clients">
                        <tbody>
                            <tr>
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Description</th>
                            </tr>
                            {data.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.course_code}</td>
                                    <td>{item.course_name}</td>
                                    <td>{item.course_description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
  }