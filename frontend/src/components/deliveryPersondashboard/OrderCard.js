import React, {Component}  from 'react'
import {useEffect,useState} from 'react'
import axios from 'axios'
import { useCookies } from "react-cookie";
import {Redirect} from 'react-router';
import cookie from 'react-cookies'
import {selectuser} from '../../features/user_slice'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router';

const OrderCard = (props) => {
    
    let redirectvar = null
    const history = useHistory();
    
    // function addToFavourite(){

    //     var headers = new Headers(); 
    //     const data = {
    //         email:user.user.email,
    //         resteraunt_name:props.resteraunt_name,
    //         restdp:props.restdp,
    //         zipcode:props.zipcode
    //     }
    //     console.log(data)
    //     axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        
    //  axios.post(process.env.REACT_APP_BACKEND+"addTofavourites",data).then(response=>{
             
    //          if(response.status === 200)
    //          {
                 
    //              alert("Added the restaurant as a favourite")
                 
    //          }
    //          else if(response.status === 202)
    //          {
    //             alert("already added as favourite")
    //          }

    //  })
    


    

    // }

        function acceptOrder(e){
            e.preventDefault();
            const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // Note: month starts at 0
        const day = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

            let data ={
                ...props.order,
                deliveryPerson_email:localStorage.getItem('deliveryPerson'),
                // order_delivered_time:`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
                status:"Out For Delivery"
            }
            console.log(data);

            axios.put(`http://localhost:8000/orders/${props.order.order_id}`,{
                ...data
            })
            .then(res=>{
                console.log(res.data.order)
                history.push("/deliveryPersondash/myorders")
            })
            .catch(err=>console.log(err))

           

        }

    
    return (
        <div className="col-md-4 mb-4" >
        {redirectvar}
        <div className="card h-100" >
            {/* <img className="card-img-top" style={{width: "100%",height: "8vw"}} src = {props.restdp} alt="Design" /> */}
            <div className="card-body">
            <h4 className="card-title">Restaurant: {props.resteraunt_name}</h4>
            <br></br>
            <p className="card-text">Pickup Address: {props.pickup_address}</p>
            <p className="card-text">Delivery Address: {props.delivery_address}</p>
            <p><b style={{color:"black"}}>Status : {props.status}</b></p>
            <p><b style={{color:"black"}}>Ordered Time: {props.ordered_time}</b></p>
            </div>
            <div className="card-footer py-4">
            
             <button type="button" onClick={acceptOrder}
            class="btn btn-dark" >
                Accept &nbsp;&nbsp;{Math.round(props.order.price*0.10 * 100) / 100} $</button>
                </div>
        </div>
        </div>
        
    )
}

export default OrderCard
