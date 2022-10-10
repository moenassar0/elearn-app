import { useRef, useState, useEffect } from 'react';
import React from 'react'
import axios, { Axios } from '../api/axios';
import PropTypes from 'prop-types';

function ShowEnrolledStudentsPopup(props){
     
    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <button onClick={() => { props.setTrigger(false)} }className='close-btn'>Close</button>
                <button onClick={ () => {} }>Enroll</button>
            </div>
        </div>
    ) : '';
}

export default ShowEnrolledStudentsPopup;