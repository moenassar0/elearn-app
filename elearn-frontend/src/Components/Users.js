import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios, { Axios } from '../api/axios';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import AddStudentPopup from './AddStudentPopup';

export function Users() {

    const [data, getData] = useState([])
 
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/auth/users');
        console.log(response.data.instructors)
        getData(response.data.instructors);
    }

    //Usestate for button popup
    const [buttonPopup, setButtonPopup] = useState(false);

    return (
        <div>
            <AddStudentPopup trigger={buttonPopup} setTrigger={setButtonPopup} setData={getData}>
            </AddStudentPopup>
            <div className='container'>
                <div className="main-header">
                    <div className="main-header-title">
                        <span>Check out the list of users</span>
                        <div className='add-user-btn'>
                            <button onClick={() => {setButtonPopup(true)}}>+</button>
                        </div>
                    </div>
                    <div className="main-display-table">
                        <table className="main-table" id="main-table-clients">
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                                {data.map((item, i) => (
                                    <tr key={i}>
                                        <td>{item._id}</td>
                                        <td>{item.f_name + " " + item.l_name}</td>
                                        <td>{item.email}</td>
                                        <td><button>Edit</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        
    );
  }