import React from 'react'
import {useCart} from 'react-use-cart'
import {FaTrash} from 'react-icons/fa'
import {Link} from 'react-router-dom'

import { useHistory } from 'react-router-dom'
const Cart = (props) => {
    function placeOrder(){
        if(isEmpty){
            alert("Cart is empty!!Please add some thing in your card")
        }
    }
    const {
        isEmpty,
        totalItems,
        items,
        totalUniqueItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart

    } = useCart();
    const history = useHistory();
    function emptycart(){
        emptyCart()
        alert("Emptied cart!")
        history.push("/userdash");
    }

    if (isEmpty) return <h1 className="text-center">Your cart is empty</h1>

    return (
        <div >
                <h4>Your Cart</h4>
                <table >
                    <tbody>
                    {console.log(items[0])}
                        {
                            
                            items.map((item)=>{

                                return(
                                
                                <tr>
                                    
                                    <td>
                                        <img src={item.menu_dp} style={{height:"4rem"}} />
                                        
                                    </td>
                                    <td style={{marginLeft:"10rem"}}>
                                        <h4>{item.dish_name}</h4>
                                    </td>
                                    <td>
                                    <h4>{item.quantity*item.price}$</h4>
                                    </td>
                                    <td>
                                    <h4>{item.quantity}</h4>
                                    </td>
                                    <td>
                                        <button className="btn btn-light" onClick={()=>updateItemQuantity(item.id,item.quantity-1)}>-</button>
                                        <button className="btn btn-light" onClick={()=>updateItemQuantity(item.id,item.quantity+1)}>+</button>
                                        <button className="btn btn-danger"onClick={()=>removeItem(item.id)}><FaTrash /></button>

                                    </td>


                                </tr>)
                            })
                        }
                        <tr>
                                    
                                    <td>
                                        
                                        
                                    </td>
                                    <td>
                                        <h4>Total amount</h4>
                                    </td>
                                    <td>
                                        
                                    </td>
                                        <td>
                                        <h4>    {cartTotal}$</h4>

                                    </td>
                                    <td>
                                        
                                    </td>


                                </tr>


                        <tr>
                                    
                                    <td>
                                        
                                        
                                    </td>
                                    <td>
                                    <a href="/userdash/cart" ><button className = "btn btn-dark" onClick={()=>props.setcheck(false)}>Confirm and Place order</button></a>
                                    </td>
                                    <td>
                                        
                                    </td>
                                    <td>
                                    <button className = "btn btn-dark" onClick={()=>emptycart()}>EmptyCart</button>

                                    </td>
                                    <td>
                                        
                                    </td>


                                </tr>
                    </tbody>
                </table>
            </div>

    )
}

export default Cart
