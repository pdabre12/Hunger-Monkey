import React from 'react'
import {Redirect, Link} from 'react-router-dom'
const RestoCard = (props) => {
    let redirectvar=null
    function viewMenu(resto){
        console.log("clicked")
        redirectvar=<Redirect to={{
            pathname: '/restoProfile',
            resto:resto
        }}  />
    }
    return (
        <div style={{marginBottom:"2rem",height:"10%"}} >
        {redirectvar}
        <div className="card" style={{textAlign:"center"}} >
            <img className="card-img-top" style={{width: "100%",height: "10vw"}} src = {props.restdp} alt="Design" />
            <div className="card-body">
            <h4 className="card-title">{props.resteraunt_name}</h4>
            <p className="card-text" style={{whiteSpace:"nowrap"}}>{props.address.substr(0,props.address.length-9)}</p>
            <p><b style={{color:"black"}}>{props.zipcode}</b></p>
            </div>
            <div className="card-footer py-4">
            
            <Link to={{pathname:"/main/restoProfile",state:{resto:props.resto}}} ><button type="button" class="btn btn-dark"  >View Menu</button></Link>
            <button type="button" class="btn btn-" disabled style={{float:"right"}} ><b>ETA:</b> {props.time*2} - {props.time*2.5} mins</button> </div>
        </div>
        </div>
        
    )
}

export default RestoCard
