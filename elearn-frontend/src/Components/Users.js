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
            <button onClick={() => {setButtonPopup(true)}}>Popup</button>
            <AddStudentPopup trigger={buttonPopup} setTrigger={setButtonPopup} setData={getData}>
                <h3>asdasda asda</h3>
            </AddStudentPopup>
            <table>
                <tbody>
                <tr>
                    <th>User Id</th>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                </tr>
                {data.map((item, i) => (
                    <tr key={i}>
                        <td>{item.f_name}</td>
                        <td>{item.email}</td>
                    </tr>
                ))
            }
                </tbody>

            </table>
        </div>
    );
  }