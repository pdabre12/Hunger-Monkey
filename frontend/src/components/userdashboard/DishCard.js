import React from 'react'
import {useCart} from 'react-use-cart' 
const DishCard = (props) => {

    var dish = {
        ...props.dish,
        id:props.dish.menu_id
    }
    console.log(dish)
    let mydish
    const {addItem,isEmpty,items,totalItems} = useCart();
    function additemincart(mydish){
        
        console.log(mydish)
        if(isEmpty){
            addItem(mydish)
            alert("Item added to cart!")
        }
        else{
            let flag=0
            console.log("items",items)
            for(var adish of items){
                if(adish.restaurant_email!=mydish.restaurant_email){
                    console.log(adish.restaurant_email)
                    console.log(mydish)
                    alert("You cannot add dish from some other restaurant in the same cart")
                    flag=1
                    break
                }
            }
            if(flag!=1){
                addItem(mydish,1)
                alert("Item added to cart!")
            }
        }

    }

    return (
 
        <div className="col-md-4 mb-4" id={props.dish.menu_id}>
        <div className="card h-100" id={props.dish.menu_id}>
            <img className="card-img-top" style={{width: "100%",
            height: "15vw",
            objectFit: "cover"}} src = {props.dish.menu_dp} alt="Design" />
            <div className="card-body">
            <h4 className="card-title">{props.dish_name}</h4>
            <p className="card-text">{props.dish.description}</p>
            <p className="card-text">{props.dish.cuisine}</p>
            <p><b style={{color:"black"}}>{props.dish.price}$</b></p>
            </div>
            <div className="card-footer py-4">
             
            
            <button type="button" class="btn btn-dark" onClick={()=>additemincart(dish)}>Add to cart</button>

                </div>
        </div>
        </div>
    )
}

export default DishCard
