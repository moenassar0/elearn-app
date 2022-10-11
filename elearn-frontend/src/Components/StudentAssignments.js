import { useEffect, useState } from "react";
import axios, { Axios } from '../api/axios';

export const StudentAssignments = () => {

    const [courses, setCourses] = useState([])
    const [showAssignments, setShowAssignments] = useState(false);

    useEffect(() => {
        fetchSchedule()
    }, [])

    function showAssignmentsDiv(course_id){

    }

    //Get instructor's assigned courses
    const fetchSchedule = async () => {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/studentcourses',
        {}, 
        {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}});
        setCourses(response.data.courses);
    }
    return (
        <>
            {courses.map((course) => (
                <button onClick={() => {showAssignmentsDiv()}}>{course.course_name}</button>
            ))}
        </>
    )
}