import React, {Component}  from 'react'
import {useEffect,useState} from 'react'
import axios from 'axios'
import { useCookies } from "react-cookie";

import DishCard from './DishCard'
const Resteraunts = (props) => {
    
    let [dishes_received,setdishes]=useState([])
    
    
            
           
    useEffect(()=>{
        if(true){
        console.log("herhehrehrhehrehrehh")
             var headers = new Headers(); 
           const data = {
                
            }
  
        axios.post(process.env.REACT_APP_BACKEND+"getallDishes",data).then(response=>{
                
                if(response.status === 200)
                {
                    
                    console.log(response.data,typeof response.data)
                    setdishes(response.data[0])
                    
                    console.log("gsdfsdfds",dishes_received)
                    
                    
                }
                else if(response.status === 202)
                {
                    console.log("no data found")
                }

        })
       
    }
    else{
        console.log("got some props")
    }



},[]);
  

let details_received= dishes_received.map((dish,index) => {
    return(
        
    <DishCard id = {dish.id} 
    key ={dish.dish_id} 
    dishdp={dish.dishdp} 
    dish_name ={dish.dish_name}
    dish_desc={dish.dish_desc}
    dish={dish}
    price = {dish.price}
    
    />

    )
})


    return (


        
            <div id="services" className="container">
            
   <h2 className="display-4 text-center mt-5 mb-3">Dishes</h2>
   <hr />
        
   <div className="row text-center">
      {details_received}
     



    </div>
    


</div>
    )
}

export default Resteraunts
