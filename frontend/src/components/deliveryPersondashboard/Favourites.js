import React, {Component}  from 'react'
import {useEffect,useState} from 'react'
import axios from 'axios'
import { useCookies } from "react-cookie";
import RestoCard from './OrderCard'
import {Redirect} from 'react-router';
import cookie from 'react-cookies'
import {selectuser,getfavourites} from '../../features/user_slice'
import {useSelector,useDispatch} from 'react-redux'

const Favourites = (props) => {
    const user = useSelector(selectuser)
    let redirectVar = null
    let [restos_received,setrestos]=useState([])
    const dispatch = useDispatch()
    
    
    
    useEffect(()=>{
        
             var headers = new Headers(); 
           const data = {
               email:user.user.email
               ,
            user_type:"customer"
           }
           console.log("redux user------->",user)
           
           async function getfavs(user) {
            let favs=await dispatch(getfavourites(user))
            
            console.log("here are your favourites",favs.payload)
            setrestos(favs.payload)
 
          }
          getfavs(data)

        /*
        axios.post(process.env.REACT_APP_BACKEND+"getfavourites",data).then(response=>{
                
            if(response.status === 200)
            {
                
                console.log(response.data,typeof response.data)
                setrestos(response.data)
                console.log("got the restaurants",restos_received)
                
            }
            else if(response.status === 202)
            {
                console.log("no data found")
            }

    })
   */
  
    



},[]);
/*  
if(!cookie.load('cookie')){
    redirectVar = <Redirect to= "/userlogin"/>
}*/

if(localStorage.getItem("deliveryPerson")==null){
    console.log("loaded successfully")
    redirectVar = <Redirect to= "/deliveryPersonlogin"/>
}
let details_received
if (restos_received!=null){
details_received= restos_received.map((resto,index) => {
    return(
     
    <RestoCard
    resto={resto}  
    restdp={resto.restdp} 
    resteraunt_name ={resto.resteraunt_name}
    address={resto.address}
    zipcode={resto.zipcode}

    />

    )
})

}
else{
 details_received=()=>{return <div>No favourites found</div>}  
}
    return (


        
            <div id="services" className="container">
            {redirectVar}
   <h2 className="display-4 text-center mt-5 mb-3">Favourites</h2>
        
   <div className="row text-center">
      {details_received}
     



    </div>
    


</div>
    )
    
    

}

export default Favourites
