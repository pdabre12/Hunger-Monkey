import React from 'react'
import {useCart} from 'react-use-cart'
import {useState,useEffect,useRef} from 'react'
import axios from 'axios'
import { useCookies } from "react-cookie";
import { Spinner } from 'react-bootstrap';

import {Redirect} from 'react-router-dom'


import { useHistory } from 'react-router-dom';

const Checkout = () => {
    
    const [addr_update,setaddr_update]=useState(true)
    const [addr,setaddr]=useState()
    const [restData,setRestData] = useState();
    let redirectVar = null;
    const [inserted,setinserted]=useState(false)
    const history = useHistory();
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {
     componentRestrictions: { country: "us" },
     fields: ["address_components", "geometry", "icon", "name"],
     types: ["address"]
    };
    

    
    useEffect(()=>{
        console.log(items)
        const interval = setInterval(() => {
            if (window.google) {
              clearInterval(interval);
              autoCompleteRef.current = new window.google.maps.places.Autocomplete(
                inputRef.current,
                options
               );
              // window.google is now available, so you can use it here
            }
          }, 100);

     
    
      axios.get(process.env.REACT_APP_BACKEND+`profile/${localStorage.getItem("user")}`)
        .then(response=>{
               
               setaddr(response.data.data.address)               
               
               console.log(response.data.data.address)

   }).catch(err=>{
    console.log(err)
   })

   axios.get(process.env.REACT_APP_BACKEND+`restaurants/${items[0].restaurant_email}`)
   .then(res=>{
    console.log(res.data.data)
    setRestData(res.data.data)


   })
   .catch(err=>{
    console.log(err)
   })

   return () => clearInterval(interval);


},[]);
    
    
    
const {
    isEmpty,
    items,
    cartTotal,
    emptyCart

} = useCart();

function emptycart(){
    emptyCart()
}


    function placeNewOrder(){
        var ordered_menu_items = items.map((item=>{
            return item.menu_id
        }))
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // Note: month starts at 0
        const day = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        let data={
            email:localStorage.getItem("user"),
            restaurant_email:items[0].restaurant_email,
            restaurant_address:restData.street,
            status:"Incomplete",
            price:cartTotal,
            delivery_address:addr,
            placed_order_time:`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
            ordered_menu_items:ordered_menu_items
           
        }
            const new_promise = new Promise(async (resolve,reject)=>{
            axios.post(process.env.REACT_APP_BACKEND+"orders/create",{
           ...data
        }).then(response=>{
            localStorage.setItem("order_id",response.data.order.order_id)
            resolve(response)
            
            })  
            .catch(err=>{
                console.log(err)
                reject(err)
            } )      
       })
       new_promise.then(res=>{
        console.log(res)
        axios.post(process.env.REACT_APP_BACKEND+"stripe/create-checkout-session",{
            cartItems:items,order_id:res.data.order.order_id
        }).then(res=>{
            console.log(res)
            window.location.replace(res.data.url)
        })
        .catch(err=>{
            console.log(err)
        })
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
    return (
    <>
        {redirectVar}
        {restData?(
            <div>
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
                                     
                                    
                                     <td><b>Restaurant Email</b></td>
                                     <td><b>Restaurant zipcode</b></td>
                                        
                             </tr>
                         </thead>
                    <tbody>
                         
                        {
                            
                            items.map((item)=>{
                                return(
                                <tr key={item.id}>
                                    
                                  
                                    <td>{String(item.dish_name).trim()}</td>
                                     <td>{item.price}$</td>
                                     <td>{item.quantity}</td>
                                        
                                          
                                            <td>{item.quantity*item.price}$</td>
                                            <td>{item.restaurant_email}</td>
                                            <td>{restData?restData.pincode:""}</td>
                                        
                                  
                                    
                                    
                                  

                                </tr>)
                            })
                        }
                        
                        
                    </tbody>
                </table>
                <hr />
                <h4>Total Amount {cartTotal}$</h4>
                <hr />
                <h4>Delivery Address</h4>
                <textarea name="address" value={addr} ref={inputRef} onSelect={e => setaddr(e.target.value)} onChange={e => setaddr(e.target.value)} rows="2" cols="10" disabled={addr_update}>{addr}</textarea>    
                <h1></h1>
                <hr />
                {/* <h4>Special instructions</h4>
                <textarea name="instructions" value={instr} onChange={e => setinstr(e.target.value)} rows="2" cols="10" >{instr}</textarea>    
                <h1></h1>
                <hr /> */}
                <button className="btn btn-dark" onClick={()=>{setaddr_update(!addr_update)} }  style={{width:"25%"}}>Update Address</button>
                &nbsp;&nbsp;&nbsp; 
                <button className = "btn btn-dark" onClick={()=>placeNewOrder()} style={{width:"25%"}} >Confirm and Place order</button>
                &nbsp;&nbsp;&nbsp;
                                        <button  className = "btn btn-dark"  onClick={()=>emptycart()} style={{width:"25%"}}>EmptyCart</button>
         
            </div>
        </section>
        </div>
        ) : (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "90vh",
    }}
  >
    <Spinner animation="border" variant="success" />
  </div>
  )}

</>
    )
}

    

export default Checkout;
