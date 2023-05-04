import React from 'react'
import {useCart} from 'react-use-cart'
import {FaTrash} from 'react-icons/fa'
import {Link} from 'react-router-dom'
const Cart = () => {

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
    if (isEmpty) return <h1 className="text-center">Your cart is empty</h1>

    return (
        <section className="py-4 container">
            <div className="row justify-content-center">
                <h4>Your Cart</h4>
                <table className="table table-light table-hover m-0">
                    <tbody>
                         
                        {
                            
                            items.map((item)=>{
                                return(
                                <tr>
                                    
                                    <td>
                                        <img src={item.menu_dp} style={{height:"6rem"}} />
                                        
                                    </td>
                                    <td>
                                        {item.dish_name}
                                    </td>
                                    <td>
                                        {item.quantity*item.price}
                                    </td>
                                    <td>
                                        {item.quantity}
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
                                       <Link to="/userdash/cart"> <button className = "btn btn-dark">Checkout</button></Link>
                                    </td>
                                    <td>
                                        
                                    </td>
                                    <td>
                                    <button className = "btn btn-dark" onClick={()=>emptyCart()}>EmptyCart</button>

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
