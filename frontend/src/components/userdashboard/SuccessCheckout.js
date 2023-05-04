import React, { useEffect } from "react";
import './checkout.css';
import { useHistory } from "react-router";
import { useCart } from "react-use-cart";

    

const SuccessCheckout = () =>{

    const {
        emptyCart
    
    } = useCart();
    const history = useHistory();

    useEffect(()=>{

            const timeout = setTimeout(() => {
                emptyCart();
                history.push('/userdash/myorders');
              }, 5000);
          
              return () => clearTimeout(timeout);
        
        },[history])



    return(
        <>    
<div className="checkout-failed">
      <h1>Order Placed</h1>
      <p>Redirecting you to the orders page in 5 seconds...</p>
    </div>
</>

    )
}

export default SuccessCheckout;