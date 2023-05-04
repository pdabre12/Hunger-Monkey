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
    // const user = useSelector(selectuser)
    // const dispatch=useDispatch()    
    // function CancelOrder(){
    //     let data={
    //         id:props.order._id,
    //         status:"cancelled"
    //         ,
    //         user_type:"customer"
    //     }
        

    //     async function update(data) {
    //         await dispatch(updateOrder(data))
            
    //         console.log("order updated ")
    //        setupdated(true)
 
    //       }
    //       update(data)
            
    // };
        function DeliverOrder(e){
        e.preventDefault()
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // Note: month starts at 0
        const day = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

            let data ={
                ...props.order,
                order_delivered_time:`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
                status:"Delivered"
            }
            console.log(data);

        console.log("here is the order",props.order)
        axios.put(`http://localhost:8000/orders/${props.order.order_id}`,{
...data

        }).then(response=>{

            console.log("updated",response.data)
            document.location.reload()
            // props.isupdated(!props.updated)

        })
    };


    
    if(updated==true){
        redirectvar=<Redirect to="/deliveryPersondash" />
    }
    return (
 
        <div className="col-md-4 mb-4" >
        {redirectvar}
        <div className="card h-100" >
      
            <div className="card-body" id={props.order.id} >
            <button type="button" class="btn btn-dark"  disabled ={props.order.status=="Refunded"?true:false} style={{float:"right"}} onClick={DeliverOrder}>{Math.round(props.order.price*0.10 * 100) / 100} $</button>

            <p><b style={{color:"black"}}>{props.order.restaurant_email}</b></p>
            <hr />
            <table> 
            {/* <tr><td><b style={{color:"black"}}>Zipcode:</b></td><td>{props.order.delivery_address}<br /></td></tr> */}
            <tr><td><b style={{color:"black"}}>User: </b></td><td>{props.order.email}<br /></td></tr>
            <tr><td><b style={{color:"black",margin:"3.5rem"}}>Amount:</b></td><td>{props.order.price} $<br /></td></tr>
            <tr><td><b style={{color:"black"}}>Order Placed Time:</b></td><td>{props.order.placed_order_time}<br /></td></tr>
            <tr><td><b style={{color:"black"}}>Status:</b></td><td>{props.order.status}<br /></td></tr>
            <tr><td><b style={{color:"black"}}>Delivery Address:</b></td><td>{props.order.delivery_address}<br /></td></tr>
            
            {/* <tr><td><b style={{color:"black"}}>Special Instructions:</b></td><td>{props.order.instructions}<br /></td></tr> */}
            </table>
            </div>
            <div className="card-footer py-4">
            <button type="button" class="btn btn-dark" onClick={DeliverOrder}  disabled={(props.order.status=="Cancelled"||props.order.status=="Delivered"|| props.order.status=="Refunded")? true : false}>Mark as Delivered</button>

                </div>
        </div>
        </div>
    )
}

export default CurrentOrderCard
