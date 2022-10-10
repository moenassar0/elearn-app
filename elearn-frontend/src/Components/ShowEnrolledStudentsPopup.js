import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios, { Axios } from '../api/axios';
import PropTypes from 'prop-types';


function ShowEnrolledStudentsPopup(props){
    
    const [studentsData, setStudentsData] = useState([]);
    const [call, setCall] = useState(false);
    useEffect(() => {
        fetchStudentData()
    }, [])

    //Get instructor's assigned courses
    const fetchStudentData = async () => {
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/auth/enrolled',
            {course_id: props.course_id}, 
            {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}});
            console.log(response);
            console.log(props.course_id);
            setStudentsData(response.data.students);
            setCall(true);
        }catch{
        }
    }

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
            {!call && <img className='img-resize' src="../../images/loading-load.gif"></img>}
                <button onClick={() => { props.setTrigger(false)} }className='close-btn'>Close</button>
                <table className="main-table" id="main-table-clients">
                        <tbody>
                            <tr>
                                <th>List of enrolled students:</th>
                            </tr>
                            {studentsData.map((item, i) => (
                                <tr key={item._id}>
                                    <td>{item.f_name + " " + item.l_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
        </div>
    ) : '';
}

export default ShowEnrolledStudentsPopup;