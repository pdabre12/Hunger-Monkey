import React from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import {useState} from 'react'
import {updateOrder} from '../../features/resto_slice'
import {useSelector,useDispatch} from 'react-redux'
import {update_order} from '../mutation_queries'

const CurrentOrderCard = (props) => {
    let redirectvar=null
    const [updated,setupdated]=useState(false)
const [btnstat,setbtn]=useState("visible")
const [dropbtn,setdrop]=useState('')
const dispatch= useDispatch()
    function updateCustOrder(type){

        let data={
            status:dropbtn
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

    function refundOrder(e){
      
        axios.post(process.env.REACT_APP_BACKEND+"stripe/refunds",{
            paymentId: props.order.stripe_paymentIntent_id,
           
        })
        .then((res)=>{
            axios.put(process.env.REACT_APP_BACKEND+`orders/${props.order.order_id}`,{
                "status":"Refunded"
            })
            document.location.reload()
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
        
    }

    //{visibility:props.order.order_status!="completed" || props.order.order_status!="cancelled" || props.order.order_status!="delivered" || props.order.order_status!="delivered" ? "hidden" : "picked up"}
    
    if(updated==true){
        redirectvar=<Redirect to="/restodash" />
    }
    console.log("drop btn",props.order)
    
    return (
 
        <div className="col-md-4 mb-4" >
        {redirectvar}
        <div className="card h-100" >

        <div className="card-body" id={props.order.id}>
            <table> 
            {/* <tr><td><b style={{color:"black"}}>Zipcode:</b></td><td>{props.order.restaurant_zipcode}<br /></td></tr> */}
            <tr><td><b style={{color:"black"}}>User Email:</b></td><td>{props.order.email}<br /></td></tr>
            <tr><td><b style={{color:"black"}}>Amount:</b></td><td>{Math.round(props.order.price*0.80 * 100) / 100}$<br /></td></tr>
            <tr><td><b style={{color:"black"}}>Order Placed Time:</b></td><td>{props.order.placed_order_time}<br /></td></tr>
            <tr><td><b style={{color:"black"}}>Status:</b></td><td>{props.order.status}<br /></td></tr>
            <tr><td><b style={{color:"black"}}>Delivery Address:</b></td><td>{props.order.delivery_address}<br /></td></tr>
            {/* <tr><td><b style={{color:"black"}}>Special Instructions:</b></td><td>{props.order.instructions}<br /></td></tr> */}
            </table>
            </div>
            
            <div className="card-footer py-4">
            
            
            &nbsp; &nbsp;
            <div class="dropdown">
      <div class="dropdown-select">
        
        <i class="fa fa-caret-down icon"></i>
      </div>
      <select class="dropdown-list" onChange={(e)=>{setdrop(e.target.value)}}>
        <option class="dropdown-list__item" key="received" value="Placed" selected>Placed</option>
        <option class="dropdown-list__item" key="preparing" value="Preparing" >Preparing</option>
        {/* <option class="dropdown-list__item" key="on the way"  value="on the way" >On the way</option> */}
        <option class="dropdown-list__item" key="ready"  value="Pickup ready">Pickup ready</option>
        <option class="dropdown-list__item" key="cancelled"  value="Cancelled">Cancelled</option>
        {/* <option class="dropdown-list__item" key="delivered"  value="delivered">Delivered</option> */}
      </select>
    </div>
    <hr />
    <button type="button" class="btn btn-dark" onClick={()=>{updateCustOrder(dropbtn)}} disabled={props.order.status=="Cancelled"||props.order.status=='Delivered' ||props.order.status=='Refunded'||props.order.status=='Refund'?true : false}>Update</button>
    <button type="button" class="btn btn-dark" style={{float:"right"}} onClick={()=>{refundOrder()}} disabled={props.order.status=="Refund"?false : true}>Refund Order</button>
                </div>
        </div>
        </div>
    )
}

export default CurrentOrderCard
