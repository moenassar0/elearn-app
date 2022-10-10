import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios, { Axios } from '../api/axios';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function AssignCoursePopup(props){

  

//<select id="select-voucher" class="">
//<option value="0">Select instructor:</option>
//</select>
//<option value="${voucher.code}">${voucher.code} : ${voucher.amount}$</option>
    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <select id="select-instructor" onChange={(e) => setInstructor(e.target.value)}>
                    <option value="0">Select instructor:</option>
                    {instructors.map((instructor, i) => (
                        <option key={i} value={instructor._id}>{instructor.f_name + " " + instructor.l_name}</option>
                                ))}
                </select>
                <button onClick={() => { props.setTrigger(false)} }className='close-btn'>Close</button>
                <button onClick={ assignInstructor }>Assign</button>
            </div>
        </div>
    ) : '';
}

export default AssignCoursePopup;