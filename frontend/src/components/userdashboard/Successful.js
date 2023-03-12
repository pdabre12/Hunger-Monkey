import React from 'react'
import {Link} from 'react-router-dom'
const Successful = () => {
    return (
        <div style={{marginTop:"100px",marginLeft:"100px"}}>
            <h1 style={{color:"green"}}>Order Placed Successfully</h1>
            <Link to="/userdash"><button type = "btn" className="btn btn-dark btn-xs" >Home</button></Link>
        </div>
    )
}

export default Successful
