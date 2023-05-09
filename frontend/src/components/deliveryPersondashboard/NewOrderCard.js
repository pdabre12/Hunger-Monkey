import React from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import {useState} from 'react'
const NewOrderCard = (props) => {
    let redirectvar=null
    const [updated,setupdated]=useState(false)

    function ConfirmOrder(e){
        e.preventDefault()

        let data={
            status:"Cancelled"
        }
        console.log(data)

        console.log("here is the order",props.order)
        axios.put(process.env.REACT_APP_BACKEND+`orders/${props.order.order_id}`,{
...data

        }).then(response=>{

            console.log("updated",response)
            props.isupdated(!props.updated)
 

        })
    };

    
    if(updated==true){
        redirectvar=<Redirect to="/restodash" />
    }
    return (
 
        <div className="col-md-4 mb-4" >
        {redirectvar}
        <div className="card h-100" >
      
            <div className="card-body" id={props.order.id}>
            <p><b style={{color:"black"}}>{props.order.restaurant_name}</b></p>
            <p><b style={{color:"black"}}>Zipcode  :{props.order.restaurant_zipcode}</b></p>
 
            <p><b style={{color:"black"}}>Amount:{props.order.amount}$</b></p>
            <p><b style={{color:"black"}}>Date:{props.order.order_date}</b></p>
            <p><b style={{color:"black"}}>Status:{props.order.order_status}</b></p>
            <p><b style={{color:"black"}}>Delivery Address:{props.order.delivery_address}</b></p>
            </div>
            <div className="card-footer py-4">
            
            {/* <button type="button" class="btn btn-dark" onClick={()=>{ConfirmOrder("preparing")}}>Confirm</button> */}
            &nbsp; &nbsp;<button type="button" class="btn btn-dark" onClick={(e)=>{ConfirmOrder("Cancelled")}}>Cancel</button>
            
                </div>
        </div>
        </div>
    )
}

export default NewOrderCard
