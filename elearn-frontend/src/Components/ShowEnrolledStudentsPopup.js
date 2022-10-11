import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios from '../api/axios';


function ShowEnrolledStudentsPopup(props){
    const [studentsData, setStudentsData] = useState([]);
    const [call, setCall] = useState(true);
    const headers = {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}};

    useEffect(() => {
        fetchStudentData()
    }, [])

    //Get instructor's assigned courses
    const fetchStudentData = async () => {
        setCall(false);
        const response = await axios.post('/auth/enrolled', {course_id: props.course_id}, headers);
        if(response.status == 400){
            setCall(true);
            return;
        }
        setStudentsData(response.data.students);
        setCall(true);
    }

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
            {!call && <img className='img-resize' src="../../images/loading-load.gif"></img>}
                <div className='popup-inner-top'><button onClick={() => { props.setTrigger(false)}} className='btn-purple'>Close</button></div>
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