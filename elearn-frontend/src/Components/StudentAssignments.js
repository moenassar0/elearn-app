import { useEffect, useState } from "react";
import axios from '../api/axios';

export const StudentAssignments = () => {

    const [courses, setCourses] = useState([])
    const [showAssignments, setShowAssignments] = useState(false);
    const [assignments, setAssignments] = useState([]);
    const [loadingForAssignments, setLoadingForAssignments] = useState(true);

    useEffect(() => {
        fetchSchedule()
    }, [])

    //Get student's enrolled courses
    const fetchSchedule = async () => {
        const response = await axios.post('/auth/studentcourses', {});
        setCourses(response.data.courses);
    }

    //Get assignments for specific course
    const fetchAssignments = async (course_id) => {
        setLoadingForAssignments(false);
        const response = await axios.post('/auth/assignments', {course_id});
        setAssignments(response.data.assignment);
        setShowAssignments(true);
        setLoadingForAssignments(true);
    }

    return (
        <>
        <div className='container'>
            <div className="main-header">
                <div className="main-header-title">
                    <span>Select a course to view its assignments</span>
                </div>
                <div>
                    {courses.map((course, i) => (
                    <button className="main-button" key={i} onClick={() => {fetchAssignments(course._id)}}>{course.course_name}</button>))}
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