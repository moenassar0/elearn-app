import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios from '../api/axios';
import AddUserPopup from './AddUserPopup';
import EditUserPopup from './EditUserPopup';

export function Instructors() {

    const [data, getData] = useState([])
    const [instructorToUpdate, setInstructorToUpdate] = useState('');
    const [editInstructorButton, setEditInstructorButton] = useState(false);
 
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const response = await axios.get('/auth/instructors');
        console.log(response.data.instructors)
        getData(response.data.instructors);
    }

    function callEditInstructor(instructor){
        setEditInstructorButton(true);
        setInstructorToUpdate(instructor);
    }

    //Usestate for button popup
    const [buttonPopup, setButtonPopup] = useState(false);

    return (
        <div>
            <AddUserPopup adding='Instructor' trigger={buttonPopup} setTrigger={setButtonPopup} setData={getData}>
            </AddUserPopup>
            <EditUserPopup editing='Instructor' user_id={instructorToUpdate._id} trigger={editInstructorButton} setTrigger={setEditInstructorButton} setData={getData}>
            </EditUserPopup>
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
                                        <td><button className='btn-purple' onClick={() => {callEditInstructor(item)}}>Edit</button></td>
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