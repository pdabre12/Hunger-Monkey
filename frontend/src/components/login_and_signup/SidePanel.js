import React from 'react'
import {Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
const SidePanel = () => {



    return (
        <div className="sidenav fixed-left">
         <div className="login-main-text">
         <Image src="/HungerMonkey.png" thumbnail />
         <h1><p><h4>Login or register from here to access.</h4></p></h1>
         <Link to="/restologin">    
                  <button className="btn btn-dark" >Restaurant Login</button>&nbsp;
        </Link>
        <br/>
        <Link to="/deliveryPersonlogin">    
                  <button className="btn btn-dark" >Delivery Person Login</button>&nbsp;
        </Link>
        <br/>
        <Link to="/userlogin">    
                  <button className="btn btn-dark" >Customer Login</button>&nbsp;
        </Link>&nbsp;
         </div>

      </div>
        


    )
}

export default SidePanel
