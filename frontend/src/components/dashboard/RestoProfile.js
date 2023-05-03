import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import DashNavbar from './DashNavbar'
import RestoProfNavbar  from './RestoProfNavbar'
const RestoProfile = (props) => {

    const location = useLocation();
  
    return (
        <div>
        <RestoProfNavbar />
        <div class="container mt-5">
        {console.log(location.state)}
        
        <div class="row d-flex justify-content-center">
            <div class="col-md-7">
                <div class="card p-3 py-4">
                    <div class="text-center"> <img src={location.state.resto.restaurant_dp} width="50%" class="" /> </div>
                    <div class="text-center mt-3"> 
                        <h5 class="mt-2 mb-0">{location.state.resto.restaurant_name}</h5>
                        <div class="px-4 mt-1">
                            <p class="fonts">{location.state.resto.street}&nbsp;-&nbsp;
                            
                            {location.state.resto.pincode}
                             </p>
                        </div>
                        <div class="buttons"> 
                        &nbsp;&nbsp;&nbsp;<Link to="/"><button type = "btn" className="btn btn-dark btn-xs" >Home</button></Link>

                        
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    )
}

export default RestoProfile
