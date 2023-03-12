import React, {Component}  from 'react'
import {useEffect,useState} from 'react'
import axios from 'axios'
import { useCookies } from "react-cookie";

import {Redirect} from 'react-router';
import cookie from 'react-cookies'
import {selectuser} from '../../features/user_slice'
import {useSelector,useDispatch} from 'react-redux'
import CurrentOrderCard from './CurrentOrderCard'
const Current_Orders = (props) => {
    const user = useSelector(selectuser)
    let redirectVar = null
    let [orders_received,setorders]=useState([])
    const [cookies, setCookie] = useCookies(["restaurant"]);
    console.log(user)
    
    useEffect(()=>{
        
             var headers = new Headers(); 
           const data = {
            restaurant_name:cookies.resteraunt_name,
            zipcode:cookies.zipcode,
            type:"current"
    
           }
  
        axios.post(process.env.REACT_APP_BACKEND+"getRestoOrders",data).then(response=>{
                
                if(response.status === 200)
                {
                    
                    console.log("received response here",response.data[0])
                    setorders(response.data)
                    
                }
                else if(response.status === 202)
                {
                    console.log("no data found")
                }

        })
       
   
  
    



},[]);
  
if(!cookie.load('cookie')){
    redirectVar = <Redirect to= "/restologin"/>
}

console.log(orders_received.length)
let details_received= orders_received.map((order,index) => {
    return(
     
    <CurrentOrderCard
    
   order={order}
    
    />

    )
})


    return (


        
            <div id="services" className="container">
            {redirectVar}
   <h2 className="display-4 text-center mt-5 mb-3">Current Orders</h2>
        
   <div className="row text-center">
      {details_received}
     



    </div>
    


</div>
    )
    
    
}

export default Current_Orders
