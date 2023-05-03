import React from 'react'
import {useCart} from 'react-use-cart'
import {FaTrash} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom'
const Cart = (props) => {

    const  history = useHistory();
    function placeOrder(){
        if(isEmpty){
            alert("Cart is empty!!Please add some thing in your cart")
        }
    }
    function emptycart(){
        emptyCart()
        alert("Emptied cart!")
        history.push("/userdash");
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

    if (isEmpty) {
        
        return (<h1 className="text-center" style={{marginTop:"3rem"}}>Cart is empty!! Please add some thing in your cart </h1>)

    }

    return (
        <section className="py-2 container">
            <div className="row justify-content-center">
                <h4>Your Cart</h4>
                <table className="table table-light table-hover m-0">
                    <tbody>
                    {console.log(items[0])}
                        {
                            
                            items.map((item)=>{

                                return(
                                
                                <tr>
                                    
                                    <td>
                                        <img src={item.menu_dp} style={{height:"6rem"}} />
                                        
                                    </td>
                                    <td>
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
                                    <Link to="/userdash/checkout" ><button className = "btn btn-dark" >Confirm and Place order</button></Link>
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
        </section>
    )
}

export default Cart
