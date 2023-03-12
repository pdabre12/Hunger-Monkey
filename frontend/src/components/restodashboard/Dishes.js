import React, {Component}  from 'react'
import {useEffect,useState} from 'react'
import axios from 'axios'
import { useCookies } from "react-cookie";
import cookie from 'react-cookies'
import {Link} from 'react-router-dom'
import {getDishes} from '../../features/resto_slice'
import {useSelector,useDispatch} from 'react-redux'
import {get_dishes} from '../queries'
const Resteraunts = () => {
    
    let [dishes_received,setdishes]=useState([])
    const [cookies, setCookie] = useCookies(["restaurant"]);
    const dispatch=useDispatch() 
    const [updated,setupdated]=useState(false)
    
            
           
    useEffect(()=>{
        console.log("herhehrehrhehrehrehh")
             var headers = new Headers(); 
           const data = {
             //  _id:cookies.resteraunt_id,
                resteraunt_name:cookies.resteraunt_name,
                 zipcode:cookies.zipcode,
         
            }
            axios.post("http://localhost:4000/graphql/",{
            query:get_dishes,
            variables:data


        }).then(response=>{

            console.log("here are your dishes",response)
            setdishes(response.data.data.dishes)

        })
            
   
        /*
        async function getdishes(data) {
            let mydishes = await dispatch(getDishes(data))
            console.log("here are your dishes-------------->")
            setdishes(mydishes.payload)
            
          }
          getdishes(data)
          */




    


  /*
        axios.post(process.env.REACT_APP_BACKEND+"getDishes",data).then(response=>{
                console.log("repsonse is--------->",response.data)
                if(response.status === 200)
                {
                    
                    console.log(response.data,typeof response.data)
                    setdishes(response.data)
                    console.log("gsdfsdfds=================",dishes_received)
                    
                    
                }
                else if(response.status === 400)
                {
                }

        })*/
       
    },[]);


let details_received= dishes_received.map(dish => {
    return(
        <div className="col-md-4 mb-4" >
<div className="card h-100" id={dish.dish_id}>
    <img className="card-img-top" style={{width: "100%",
    height: "15vw",
    objectFit: "cover"}} src = {dish.dishdp} alt="Design" />
    <div className="card-body">
    <h4 className="card-title">{dish.dish_name}</h4>
    <p className="card-text">{dish.dish_desc}</p>
    <p className="card-text">{dish.category}</p>
    <p className="card-text"><b style={{color:"black"}}>{dish.price}$</b></p>
    </div>
    <div className="card-footer py-4">
    
    <Link to={{pathname:"/restodash/updateDish",state:{resto:dish}}} ><button type="button" class="btn btn-dark" >Update</button></Link>
    
        </div>
</div>
</div>

    )
})


    return (


        
            <div id="services" className="container">
            
   <h2 className="display-4 text-center mt-5 mb-3">Dishes</h2>
 
   <div className="row text-center">
      {details_received}
     



    </div>
    


</div>
    )
}

export default Resteraunts
