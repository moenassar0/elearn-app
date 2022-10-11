import Login from './Login.js';
import { Link, Routes, Route } from 'react-router-dom';
import './App.css';
import { AdminDashboard } from './Components/AdminDashboard';
import { InstructorDashboard } from './Components/InstructorDashboard';
import { useRef, useState, useEffect } from 'react';
import { Students } from "./Components/Students";
import { Courses } from "./Components/Courses";
import { InstructorSchedule } from "./Components/InstructorSchedule"
import { StudentDashboard } from './Components/StudentDashboard.js';
import { StudentSchedule } from './Components/StudentSchedule';
import { StudentAssignments } from './Components/StudentAssignments';
import { Instructors } from './Components/Instructors.js';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/admin" element={ <AdminDashboard /> }>
          <Route path="/admin/students" element={<Students />}></Route>
          <Route path="/admin/instructors" element={<Instructors />}></Route>
          <Route path="/admin/courses" element={<Courses />}></Route>
        </Route>
        <Route path="/instructor" element={ <InstructorDashboard /> }>
          <Route path="/instructor/courses" element={<InstructorSchedule />}></Route>
        </Route>
        <Route path="/student" element={ <StudentDashboard /> }>
          <Route path="/student/courses" element={<StudentSchedule />}></Route>
          <Route path="/student/assignments" element={<StudentAssignments />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
