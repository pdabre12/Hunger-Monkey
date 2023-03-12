import React from 'react'
import { useState } from "react";
import "./checkout.css";
import {FaTimes} from 'react-icons/fa'
const UserCart = (props) => {

     return (props.trigger)?(
        

            <div className="popup">
                <div className="popup-inner">
                    <button onClick= {()=>props.setTrigger(false)} className = "close-btn"><FaTimes /></button>
                    {props.children}

                </div>
            </div>
        

     ):"";
}

export default UserCart
