import React,{useState} from 'react'
import {FaBars} from 'react-icons/fa'
import { useCookies } from "react-cookie";
import { useHistory } from "react-router";

const Navbar = (props) => {
    const history = useHistory();
    
    function sidehandle(e){
        e.preventDefault();
    }
    const [cookies, setCookie] = useCookies(["restaurant"]);
    
    return (
        <div class="wrapper">
            
            <div id="sidenav">
            
            <nav className="navbar navbar-expand-lg fixed-top navbar-inner" >
        
        <div className="container-fluid navcontainer row" >
        
        <form id="search-form" class="form-inline" role="form" onSubmit={sidehandle}>
            <div className="col-sm brand" >
            <a className="navbar-brand"><img style={{border:0}} size="100px" src="/ue2.png" /></a>
            
            </div>
           
            
                
            
            
            <h2> Hello, {cookies.resteraunt_name}</h2>
            <a className="navbar-brand"><img style={{border:0}} size="100px" width="60px" height="60px" src={cookies.restdp} /></a>
           
            
            <div className="col-sm">
            
            </div>

            
           
           </form> 
        
        
        </div>
        
    </nav>
    </div>
        


        </div>
    )
}

export default Navbar
