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

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
  }