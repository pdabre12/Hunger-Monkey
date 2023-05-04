import React from 'react'
import {useState,useEffect} from 'react'
import Checkout from './Checkout'
import Cart from './Cart'
import {FaShoppingCart} from 'react-icons/fa'
const RestoProfNavbar = () => {

    const [checkbtn,setcheckbtn] = useState(false)
    return (
        <div>
            
            <nav id="user-nav" className="navbar navbar-expand-lg fixed-top navbar-inner" >
        <div className="container-fluid navcontainer row" >
        
        <div class="navbar-header">
                
        </div>
        <div className="collapse navbar-collapse" id="main-navbar-collapse">
        <div className="col-sm brand" >
            <a className="navbar-brand"><img style={{border:0,width:"8rem"}} src="/ue2.png" /></a>
            
            </div>
            <div className="col-sm input-group">
            
            </div>
            <span class="input-group-btn">
                        <button onClick={()=>setcheckbtn(true)} class="btn btn-dark" data-target="#search-form" name="q">
                            <FaShoppingCart />
                              
		                 </button></span>
                         <Checkout trigger={checkbtn} setTrigger={setcheckbtn}>

                        <Cart />

                         </ Checkout>
        
            </div>
        </div>
    </nav>
        </div>
    )
}

export default RestoProfNavbar
