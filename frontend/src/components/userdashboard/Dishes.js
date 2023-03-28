import React from 'react'
import {useEffect,useState} from 'react'
import axios from 'axios'
import { useCookies } from "react-cookie";
import { useLocation, Link } from 'react-router-dom';
import DishCard from './DishCard'
import {getDishes} from '../../features/user_slice'
import {useSelector,useDispatch} from 'react-redux'
import {get_dishes} from '../queries'
const Dishes = (props) => {
    let [dishes_received,setdishes]=useState([])
    const location=useLocation()

    
            
    const dispatch=useDispatch()        
    useEffect(()=>{
        if(Object.keys(props).length != 0){
        console.log("herhehrehrhehrehrehh",location.state)
             var headers = new Headers(); 
           const data = {
                resteraunt_name:location.state.resto.resteraunt_name,
                 zipcode:location.state.resto.zipcode,
          
            }
  
            axios.post("http://localhost:4000/graphql/",{
                query:get_dishes,
                variables:data
    
    
            }).then(response=>{
    
                console.log("here are your dishes",response)
                setdishes(response.data.data.dishes)
    
            }) 
    }
    else{
        console.log("got NO props")
    }



},[]);
  

let details_received
console.log(dishes_received)
if(dishes_received.length>0)
{details_received = dishes_received.map((dish,index) => {
    return(
        
    <DishCard id = {dish._id} 
    key ={dish.dish_id} 
    dishdp={dish.dishdp} 
    dish_name ={dish.dish_name}
    dish_desc={dish.dish_desc}
    dish={dish}
    price = {dish.price}
    
    />

    )
})

}
else{
    details_received=<h1>No Dishes available in the menu</h1>
}
    return (


        
            <div id="services" className="container">
            
   <h2 className="display-4 text-center mt-5 mb-3">Menu Card</h2>
        
   <div className="row text-center">
      {details_received}
     <br />

    </div>
    


</div>
    )
}

export default Dishes
