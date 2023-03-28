import React from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import {useState} from 'react'

import {updateOrder} from '../../features/user_slice'
import {selectuser,getfavourites} from '../../features/user_slice'
import {useSelector,useDispatch} from 'react-redux'
const CurrentOrderCard = (props) => {
    let redirectvar=null
    const [updated,setupdated]=useState(false)
    const user = useSelector(selectuser)
    const dispatch=useDispatch()    
    function CancelOrder(){
        let data={
            id:props.order._id,
            status:"cancelled"
            ,
            user_type:"customer"
        }
        

        async function update(data) {
            await dispatch(updateOrder(data))
            
            console.log("order updated ")
           setupdated(true)
 
          }
          update(data)
            
    };

    
    if(updated==true){
        redirectvar=<Redirect to="/userdash" />
    }
    return (
 
        <div className="col-md-4 mb-4" >
        {redirectvar}
        <div className="card h-100" >
      
            <div className="card-body" id={props.order.id}>
            <p><b style={{color:"black"}}>{props.order.restaurant_name}</b></p>
            <hr />
            <table> 
            <tr><td><b style={{color:"black"}}>Zipcode:</b></td><td>{props.order.restaurant_zipcode}<br /></td></tr>
            
            <tr><td><b style={{color:"black"}}>Amount:</b></td><td>{props.order.amount}$<br /></td></tr>
            <tr><td><b style={{color:"black"}}>Date:</b></td><td>{props.order.order_date}<br /></td></tr>
            <tr><td><b style={{color:"black"}}>Status:</b></td><td>{props.order.order_status}<br /></td></tr>
            <tr><td><b style={{color:"black"}}>Delivery Address:</b></td><td>{props.order.delivery_address}<br /></td></tr>
            <tr><td><b style={{color:"black"}}>Special Instructions:</b></td><td>{props.order.instructions}<br /></td></tr>
            </table>
            </div>
            <div className="card-footer py-4">
            <button type="button" class="btn btn-dark"  onClick={CancelOrder} disabled={props.order.order_status=="placed"? false : true}>Cancel</button>
           
                </div>
        </div>
        </div>
    )
}

export default CurrentOrderCard
