import React, { useEffect } from "react";
import './checkout.css';
import axios from "axios";
import { useHistory } from "react-router";

const CancelCheckout = () =>{
    const history = useHistory();

    useEffect(()=>{

        
        if(localStorage.getItem("order_id")){
            axios.delete(process.env.REACT_APP_BACKEND+`orders/${localStorage.getItem("order_id")}`,{
            }).then(response=>{
                            console.log("updated",response.data)
                }).catch(err=>{
                    console.log(err)
                })
                

            }

            const timeout = setTimeout(() => {
                localStorage.removeItem("order_id");
                history.push('/userdash/checkout');
              }, 5000);
          
              return () => clearTimeout(timeout);
        
        },[history])



    return(
        <>    
<div className="checkout-failed">
      <h1>Checkout Failed</h1>
      <p>Do you wanna shop around?</p>
      <p>Add more items to the cart and try again.</p>
      <p>Redirecting you to the checkout page in 5 seconds...</p>
    </div>
</>

    )
}

export default CancelCheckout;