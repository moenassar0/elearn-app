import Login from './Login.js';
import { Link, Routes, Route } from 'react-router-dom';
import './App.css';
import { AdminDashboard } from './Components/AdminDashboard';
import { InstructorDashboard } from './Components/InstructorDashboard';
import { useRef, useState, useEffect } from 'react';
import useToken from './useToken';
import {Users} from "./Components/Users";
import {Courses} from "./Components/Courses";
import { InstructorSchedule } from "./Components/InstructorSchedule"
import { StudentDashboard } from './Components/StudentDashboard.js';
import { StudentSchedule } from './Components/StudentSchedule';
import { StudentAssignments } from './Components/StudentAssignments';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/admin" element={ <AdminDashboard /> }>
          <Route path="/admin/users" element={<Users />}></Route>
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
