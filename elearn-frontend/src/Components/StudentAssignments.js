import { useEffect, useState } from "react";
import axios from '../api/axios';
import SubmitAssignmentPopup from "./SubmitAssignmentPopup";

export const StudentAssignments = () => {

    const [courses, setCourses] = useState([])
    const [showAssignments, setShowAssignments] = useState(false);
    const [assignments, setAssignments] = useState([]);
    const [loadingForAssignments, setLoadingForAssignments] = useState(true);
    const [currAssignmentID, setcurrAssignmentID] = useState('');
    const [assignmentPopupButton, setAssignmnetPopupButton] = useState(false);
    const headers = {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}};

    useEffect(() => {
        fetchSchedule()
    }, [])

    //Get student's enrolled courses
    const fetchSchedule = async () => {
        const response = await axios.post('/auth/studentcourses', {}, headers);
        setCourses(response.data.courses);
    }

    //Get assignments for specific course
    const fetchAssignments = async (course_id) => {
        setLoadingForAssignments(false);
        const response = await axios.post('/auth/assignments', {course_id}, headers);
        setAssignments(response.data.assignment);
        setShowAssignments(true);
        setLoadingForAssignments(true);
    }

    //Get assignmentID and open popup
    function assignmentPopup(assignment_id){
        setcurrAssignmentID(assignment_id);
        setAssignmnetPopupButton(true)
    } 

    return (
        <>
        <div className='container'>
            <SubmitAssignmentPopup assignment_id={currAssignmentID} trigger={assignmentPopupButton} setTrigger={setAssignmnetPopupButton} />
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
                                <th>Due Date</th>
                                <th>Submit</th>
                            </tr>
                            {!loadingForAssignments && <img className='img-resize' src="../../images/loading-load.gif"></img>}
                            {showAssignments && assignments.map((assignment) => (
                                <tr key={assignment._id}>
                                    <td>{assignment.assignment_description}</td>
                                    <td>{assignment.date}</td>
                                    <td><button onClick={() => {assignmentPopup(assignment._id)}}>Submit</button></td>
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