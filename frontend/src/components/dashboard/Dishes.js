import React from 'react'
import {useEffect,useState} from 'react'
import axios from 'axios'
import { useLocation, Link } from 'react-router-dom';
import DishCard from './DishCard'


const Dishes = (props) => {
    let [dishes_received,setdishes]=useState([])
    const location=useLocation()
   
    
    
            
    useEffect(()=>{
        if(Object.keys(props).length != 0){
        console.log("herhehrehrhehrehrehh",location.state)
             var headers = new Headers(); 
          
           
            axios.get(process.env.REACT_APP_BACKEND + `menus/all-menus/${location.state.resto.restaurant_email}`).then(response=>{
            

                console.log("dishes_received",response.data.menus)
                setdishes(response.data.menus)
     
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
        
    <DishCard id = {dish.menu_id} 
    key ={dish.menu_id} 
    dishdp={dish.menu_dp} 
    dish_name ={dish.dish_name}
    dish_desc={dish.description}
    dish={dish}
    price = {dish.price}
    
    />

    )
})

}
else{
    details_received=<h3 className="text-center">No Dishes available in the menu</h3>
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
