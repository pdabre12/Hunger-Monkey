import React from 'react'
import {useCart} from 'react-use-cart'
import {useState,useEffect} from 'react'
import axios from 'axios'
import { useCookies } from "react-cookie";

import {Redirect} from 'react-router-dom'
import {selectuser,getfavourites} from '../../features/user_slice'
import {useSelector,useDispatch} from 'react-redux'


import {placeOrder} from '../../features/user_slice'
import {place_order} from '../mutation_queries'
import {getCustDetails} from '../queries'
const Checkout = () => {
    
    const [addr_update,setaddr_update]=useState(true)
    const [cookies, setCookie] = useCookies(["customer"]);
    const [addr,setaddr]=useState()
    let redirectVar = null;
    const [inserted,setinserted]=useState(false)
    const [instr,setinstr]=useState("")
    const user = useSelector(selectuser)   
    useEffect(()=>{
        
        var headers = new Headers(); 
      const data = {
          email:localStorage.getItem("token")
      }
      axios.post("http://localhost:4000/graphql/",{
        query:getCustDetails,
        variables:data


    }).then(response=>{
               
               console.log(response.data,typeof response.data)
               setaddr(response.data.data.get_cust_details.address)               
               
               console.log("no data found")

   })
  






},[]);
    
    
    
const {
    isEmpty,
    items,
    cartTotal,
    emptyCart

} = useCart();
const dispatch=useDispatch() 
    function placeNewOrder(){
        let data={
            customer_email:localStorage.getItem("token"),
            restaurant_name:items[0].resteraunt_name,
            restaurant_zipcode:"95126",
            amount:cartTotal,
            delivery_address:addr,
            order_status:"placed",
            instructions:instr,
           
        }
        console.log("order details",data)
        axios.post("http://localhost:4000/graphql/",{
            query:place_order,
            variables:data
            
    
        }).then(reponse=>{
            console.log("order placed ")
            setinserted(true)

            
       })
      
    
    

        
        /*
        async function place(data) {
            await dispatch(placeOrder(data))
            
            console.log("order placed ")
            setinserted(true)
 
          }
          place(data)
    */




    }
    

    if (isEmpty) return <h1 className="text-center">Your cart is empty</h1>
    
    if(inserted==true){
        console.log("added successfully")
        emptyCart()
        redirectVar = <Redirect to= "/userdash/success"/>
    }
    return (<div>
        {redirectVar}
        <section className="py-4 container">
            <div className="row justify-content-center">
                <h4>Order Details</h4>
                <table className="table table-light table-hover m-0">
                <thead>
                             <tr>
                                     <td><b>Dish Name</b></td>
                                     <td><b>Price</b></td>
                                     <td><b>Quantity</b></td>
                                     <td><b>Total Cost</b></td>
                                     
                                    
                                     <td><b>Resteraunt Name</b></td>
                                     <td><b>Resteraunt zipcode</b></td>
                                        
                             </tr>
                         </thead>
                    <tbody>
                         
                        {
                            
                            items.map((item)=>{
                                return(
                                <tr>
                                    
                                  
                                    <td>{String(item.dish_name).trim()}</td>
                                     <td>{item.price}$</td>
                                     <td>{item.quantity}</td>
                                        
                                          
                                            <td>{item.quantity*item.price}$</td>
                                            <td>{item.resteraunt_name}</td>
                                            <td>{item.zipcode}</td>
                                        
                                  
                                    
                                    
                                  

                                </tr>)
                            })
                        }
                        
                        
                    </tbody>
                </table>
                <hr />
                <h4>Total Amount {cartTotal}$</h4>
                <hr />
                <h4>Delivery Address</h4>
                <textarea name="address" value={addr} onChange={e => setaddr(e.target.value)} rows="2" cols="10" disabled={addr_update}>{addr}</textarea>    
                <h1></h1>
                <hr />
                <h4>Special instructions</h4>
                <textarea name="instructions" value={instr} onChange={e => setinstr(e.target.value)} rows="2" cols="10" >{instr}</textarea>    
                <h1></h1>
                <hr />
                <button className="btn btn-dark" onClick={()=>{setaddr_update(!addr_update)} } style={{width:"25%"}}>Update Address</button>
                &nbsp;&nbsp;&nbsp; 
                <button className = "btn btn-dark" onClick={()=>placeNewOrder()} style={{width:"25%"}} >Confirm and Place order</button>
                &nbsp;&nbsp;&nbsp;
                                        <button  className = "btn btn-dark"  onClick={()=>emptyCart()} style={{width:"25%"}}>EmptyCart</button>
         
            </div>
        </section>
        </div>
    )}

export default Checkout
