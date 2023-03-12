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

        console.log("here---------------------updating ",type)
        let data={
            id:props.order.id,
            status:dropbtn
        }

        console.log("here is the order",props.order)
        axios.post("http://localhost:4000/graphql/",{
            query:update_order,
            variables:data


        }).then(response=>{

            console.log("updated",response)
            props.isupdated(!props.updated)
 

        })
        /*
        //props.isupdated(!props.updated)
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        async function update_order(data) {
            let response=await dispatch(updateOrder(data))
            console.log("here is the response---------------->",response)
            props.isupdated(!props.updated)
 
          }
          update_order(data)
        */
        
        /*
        axios.post(process.env.REACT_APP_BACKEND+'updateOrder',data)
            .then(response => {
                if(response.status === 200){
                    props.isupdated(!props.updated)
                    }else if(response.status === 202){
                    
                    


                    
                }
            });
          */  
    };

    //{visibility:props.order.order_status!="completed" || props.order.order_status!="cancelled" || props.order.order_status!="delivered" || props.order.order_status!="delivered" ? "hidden" : "picked up"}
    
    if(updated==true){
        redirectvar=<Redirect to="/restodash" />
    }
    console.log("drop btn",dropbtn)
    
    return (
 
        <div className="col-md-4 mb-4" >
        {redirectvar}
        <div className="card h-100" >

        <div className="card-body" id={props.order.id}>
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
            
            
            &nbsp; &nbsp;
            <div class="dropdown">
      <div class="dropdown-select">
        
        <i class="fa fa-caret-down icon"></i>
      </div>
      <select class="dropdown-list" onChange={(e)=>{setdrop(e.target.value)}}>
        <option class="dropdown-list__item" key="received" value="received" selected>Received</option>
        <option class="dropdown-list__item" key="preparing" value="preparing" >Preparing</option>
        <option class="dropdown-list__item" key="on the way"  value="on the way" >On the way</option>
        <option class="dropdown-list__item" key="ready"  value="ready">Pickup ready</option>
        <option class="dropdown-list__item" key="pickedup"  value="pickedup">Pickedup</option>
        <option class="dropdown-list__item" key="cancelled"  value="cancelled">Cancelled</option>
        <option class="dropdown-list__item" key="delivered"  value="delivered">Delivered</option>
      </select>
    </div>
    <hr />
    <button type="button" class="btn btn-dark" onClick={()=>{updateCustOrder(dropbtn)}} disabled={props.order.order_status=="cancelled"?true : false}>Update</button>
                </div>
        </div>
        </div>
    )
}

export default CurrentOrderCard
