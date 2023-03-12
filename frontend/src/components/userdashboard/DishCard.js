import React from 'react'
import {useCart} from 'react-use-cart' 
const DishCard = (props) => {
    let mydish
    let adish
    const {addItem,isEmpty,items} = useCart(mydish);
    function additemincart(mydish){
        if(isEmpty){
            addItem(mydish,1)
        }
        else{
            let flag=0
            console.log("items",items)
            for(adish of items){
                if(adish.resteraunt_name!=mydish.resteraunt_name){
                    console.log(adish.resteraunt_name)
                    console.log(mydish)
                    alert("You cannot add dish from some other restaurant in the same cart")
                    flag=1
                    break
                }
            }
            if(flag!=1){
                addItem(mydish,1)
            }
        }
    }

    return (
 
        <div className="col-md-4 mb-4" id={props.id}>
        <div className="card h-100" id={props.dish_id}>
            <img className="card-img-top" style={{width: "100%",
            height: "15vw",
            objectFit: "cover"}} src = {props.dishdp} alt="Design" />
            <div className="card-body">
            <h4 className="card-title">{props.dish_name}</h4>
            <p className="card-text">{props.dish_desc}</p>
            <p className="card-text">{props.category}</p>
            <p><b style={{color:"black"}}>{props.dish.price}$</b></p>
            </div>
            <div className="card-footer py-4">
            
            <button type="button" class="btn btn-dark" onClick={()=>additemincart(props.dish)}>Add to cart</button>

                </div>
        </div>
        </div>
    )
}

export default DishCard
