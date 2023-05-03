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
    let [dishes_received,setDishes]=useState([])
    const location=useLocation()

    
            
    const dispatch=useDispatch()        
    useEffect(()=>{
        if(Object.keys(props).length != 0){
        console.log("herhehrehrhehrehrehh",location.state)
             var headers = new Headers(); 
  
            axios.get(`http://localhost:8000/menus/all-menus/${location.state.resto.restaurant_email}`)
            .then(response=>{
    
                console.log("here are your dishes",response.data.menus)
                setDishes(response.data.menus)
    
            }) 
    }
    else{
        console.log("Got No props")
    }



},[]);
  

let details_received
console.log(dishes_received)
if(dishes_received.length>0)
{details_received = dishes_received.map((dish,index) => {
    return(
        
    <DishCard id = {dish.menu_id} 
    key ={dish.menu_id} 
    dish={dish}    
    />

    )
})

}
else{
    details_received=<h3 className='text-center'>No Dishes available in the menu</h3>
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
