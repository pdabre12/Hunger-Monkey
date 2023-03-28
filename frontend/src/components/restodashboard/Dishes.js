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
    
    let [menus_recieved,setMenus]=useState([])
    const [cookies, setCookie] = useCookies(["restaurant"]);
    const dispatch=useDispatch() 
    const [updated,setupdated]=useState(false)
    
            
           
    useEffect(()=>{
        console.log("herhehrehrhehrehrehh")
             var headers = new Headers(); 
           
            axios.get(`http://localhost:8000/menus/all-menus/${localStorage.getItem('token')}`)
            .then(response=>{

            console.log("here are your dishes",response)
            setMenus(response.data.menus)

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


let details_received= menus_recieved.map(menu => {
    return(
        <div className="col-md-4 mb-4" >
<div className="card h-100" id={menu.menu_id}>
    <img className="card-img-top" style={{width: "100%",
    height: "15vw",
    objectFit: "cover"}} src = {menu.dishdp} alt="Design" />
    <div className="card-body">
    <h4 className="card-title">{menu.dish_name}</h4>
    <p className="card-text">{menu.description}</p>
    <p className="card-text">{menu.cuisine}</p>
    <p className="card-text"><b style={{color:"black"}}>{menu.price}$</b></p>
    </div>
    <div className="card-footer py-4">
    
    <Link to={{pathname:"/restodash/updateDish",state:{resto:menu}}} ><button type="button" class="btn btn-dark" >Update</button></Link>
    
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
