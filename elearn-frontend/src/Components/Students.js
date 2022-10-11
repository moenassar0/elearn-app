import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios from '../api/axios';
import AddUserPopup from './AddUserPopup';

export function Students() {

    const [data, getData] = useState([])
    const [deleteStudent, setDeleteStudent] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const response = await axios.get('/auth/students');
        console.log(response.data.students)
        getData(response.data.students);
    }

    //Usestate for button popup
    const [buttonPopup, setButtonPopup] = useState(false);

    function callDeleteStudent(student){
        setDeleteStudent(true);
        setStudentToDelete(student);
    }

    async function deleteStudentAPI(){
        setLoading(false)
        await axios.post('/auth/user/delete', {id: studentToDelete._id});
        fetchData();
        setLoading(true);
    }

    return (
        <div>
            <AddUserPopup adding='Student' trigger={buttonPopup} setTrigger={setButtonPopup} setData={getData}>
            </AddUserPopup>
            {deleteStudent && 
            <div className='popup'>
                <div className='popup-inner'>
                    <div className='popup-inner-top'><button onClick={() => {setDeleteStudent(false)}}>Close</button></div>
                    {!loading && <img className='img-resize' src="../../images/loading-load.gif"></img>}
                    <div>Are you sure you want to delete: {studentToDelete.f_name + " " + studentToDelete.l_name}</div>
                    <button onClick={() => {deleteStudentAPI()}}>Delete</button>
                </div>
            </div>}
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
                                        <td><button>Edit</button><button onClick={() => {callDeleteStudent(item)}}>Delete</button></td>
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