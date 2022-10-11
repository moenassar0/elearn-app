import { useEffect, useState } from "react";
import axios, { Axios } from '../api/axios';

export const StudentAssignments = () => {

    const [courses, setCourses] = useState([])
    const [showAssignments, setShowAssignments] = useState(false);
    const [assignments, setAssignments] = useState([]);
    const [currentCourse, setCurrentCourse] = useState('');
    const [loadingForAssignments, setLoadingForAssignments] = useState(true);

    useEffect(() => {
        fetchSchedule()
    }, [])

    async function showAssignmentsDiv(course_id){
        setCurrentCourse(course_id);
        await fetchAssignments();
        
    }

    //Get student's enrolled courses
    const fetchSchedule = async () => {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/studentcourses',
        {}, 
        {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}});
        setCourses(response.data.courses);
    }

    //Get assignments for specific course
    const fetchAssignments = async (course_id) => {
        setLoadingForAssignments(false);
        const response = await axios.post('http://127.0.0.1:8000/api/auth/assignments',
        {course_id}, 
        {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}});
        setAssignments(response.data.assignment);
        setShowAssignments(true);
        setLoadingForAssignments(true);
    }
/*
{showAssignments && 
<table><tr>
    {assignments.map((assignment) => (
        <td>{assignment._id}</td>
    ))}
</tr></table>}
*/
    return (
        <>
        <div className='container'>
            <div className="main-header">
                <div className="main-header-title">
                    <span>Select a course to view its assignments</span>
                </div>
                <div>
                    {courses.map((course, i) => (
                    <button className="btn-purple" key={i} onClick={() => {fetchAssignments(course._id)}}>{course.course_name}</button>))}
                </div>
                <div className="main-display-table">
                    <table className="main-table" id="main-table-clients">
                        <tbody>
                            <tr>
                                <th>Assignment Description</th>
                                <th>Date</th>
                            </tr>
                            {!loadingForAssignments && <img className='img-resize' src="../../images/loading-load.gif"></img>}
                            {showAssignments && assignments.map((assignment) => (
                                <tr key={assignment._id}>
                                    <td>{assignment.assignment_description}</td>
                                    <td>{assignment.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}