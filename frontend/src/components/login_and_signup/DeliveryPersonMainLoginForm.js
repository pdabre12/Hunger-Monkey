import React,{useState} from 'react'
import Sidepanel from './SidePanel'
import BootCdn from './BootCdn'
import LoginForm from './LoginForm'
import {Link} from 'react-router-dom';
import './css/login_page.css'
import DeliveryPersonLogin from './DeliveryPersonLogin';
const DeliveryPersonMainLoginForm = () => {
    
    function getregister(e){
        document.getElementById("login_div").style.display="None"
        document.getElementById("signup_div").style.display="block"
        
       }
    function getloginform(e){
        document.getElementById("signup_div").style.display="None"
        document.getElementById("login_div").style.display="block"
        
        
    }

    return (
        <div>
            
      <div className="main">
        <BootCdn />
        <Sidepanel />
        <DeliveryPersonLogin />        
           
         
         
      </div>


    </div>
    )
}

export default DeliveryPersonMainLoginForm;
