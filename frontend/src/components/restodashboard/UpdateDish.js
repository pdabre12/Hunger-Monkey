import React from 'react'
import {useState} from 'react'
import axios from 'axios';
import cookie from 'react-cookies'
import Cookies from 'universal-cookie'
import { useCookies } from "react-cookie";
import {Redirect} from 'react-router-dom';
import {updateDish} from '../../features/resto_slice'
import {useSelector,useDispatch} from 'react-redux'
const UpdateDish = (props) => {
   
    const [inserted, setinserted] = useState(false);
    const [dish_name,setdish_name] = useState(props.location.state.resto.dish_name);
    const [dish_desc,setdish_desc] = useState(props.location.state.resto.dish_desc);
    const [dish_price,setdish_price] = useState(props.location.state.resto.price);
    const [dp,setudishdp] = useState(props.location.state.resto.menu_dp);
    const [errors,seterrors]=useState();
    const [radioval2,setradioval2] = useState(props.location.state.resto.radioval2);
    const [availability,setAvailability] = useState("yes");
    const [cuisine,setCuisine] = useState(props.location.state.resto.cuisine);
    const dispatch= useDispatch()
    console.log("here are the props",props)
    function handleUpdate(e){
        
        e.preventDefault();
        const data = {
            dish_name:dish_name,
            restaurant_email:localStorage.getItem("resto"),
            description:dish_desc,
            price:Number(dish_price),
            food_type:radioval2,
            availability:availability,
            cuisine:cuisine,
            menu_dp:dp
        }
        //set the with credentials to true
        //make a post request with the user data
        console.log("here is your data",data)
        // async function update_dish(data) {
        //     await dispatch(updateDish(data))
            
        //     setinserted(true)
 
        //   }
        //   update_dish(data)

        axios.put(process.env.REACT_APP_BACKEND+`menus/${props.location.state.resto.menu_id}`,{
            ...data
        })
            .then(response=>{

            console.log("Dishes updated",response.data.menu)
            setinserted(true)
            
    })
}

    let redirectvar=null;
    if (inserted==true){
        redirectvar = <Redirect to="/restodash" />
    }
    return (
        <div>
            {redirectvar}
            <div className="register-form" style={{marginTop:"80px"}}>
           <h2><b>Update Dish</b></h2>
           <form onSubmit={handleUpdate} enctype="multipart/form-data">
              <div className="form-group">
                    <label>Name of the dish</label>
                    <input type="text" value={dish_name}  id="dish_name" className="form-control" placeholder="Enter the dish name" onChange={e => setdish_name(e.target.value)} required/>
                 </div>
                 <div className="form-group">
                    <label>Add a description </label>
                    <input type="text" value={dish_desc} id="dish_desc" className="form-control" placeholder="Add dish description" onChange={e => setdish_desc(e.target.value)} required/>
                 </div>

                 Availability:<span>   </span>
                 <select>
                    <option value="yes" onSelect={e=>setAvailability(e.target.value)}>Yes</option>
                    <option value="no" onSelect={e=>setAvailability(e.target.value)}>No</option>
                 </select>
        
        
                 
                 <br/>
                 <br/>
        


                 <div className="form-group">
                    <label>Add a price</label>
                    <input type="number" id="dish_price" value={dish_price} className="form-control" placeholder="Your dish price please" onChange={e => setdish_price(e.target.value)} required/>
                 </div>
        
                 
                 
                
                 <h5 style={{color:"red"}}>{errors}</h5>

                 <button type="submit" className="btn btn-dark">Update</button>
                 
              </form>
           </div>
        </div>
    )
}

export default UpdateDish
