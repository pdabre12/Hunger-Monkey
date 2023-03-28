import React from 'react'
import {useState} from 'react'
import axios from 'axios';
import cookie from 'react-cookies'
import Cookies from 'universal-cookie'
import { useCookies } from "react-cookie";
import {Redirect} from 'react-router-dom';
import {addDish, getDishes} from '../../features/resto_slice'
import {useSelector,useDispatch} from 'react-redux'
import {insert_dish} from '../mutation_queries'
const CreateDish = () => {
   
    const [inserted, setinserted] = useState(false);
    const [cookies, setCookie] = useCookies(["restaurant"]);
    const [dish_name,setdish_name] = useState();
    const [dish_desc,setdish_desc] = useState();
    const [dish_price,setdish_price] = useState();
    const [availability,setAvailability] = useState("Yes");
    const [cuisine,setCuisine] = useState();
    
    const [dp,setudishdp] = useState();
    const [errors,seterrors]=useState();
    const [radioval2,setradioval2]=useState("veg");
    const dispatch=useDispatch() 

    function handleAddDish(e){
        var headers = new Headers();
    
        e.preventDefault();
        const data = {
          
            dish_name:dish_name,
            restaurant_email:localStorage.getItem("token"),
            // zipcode:cookies.zipcode,
            description:dish_desc,
            price:Number(dish_price),
            food_type:radioval2,
            availability:availability,
            cuisine:cuisine,

            // dishdp: "https://ubereatsdishimages.s3.us-east-2.amazonaws.com/Smash%20Burger94103French%20Fries.JPG"
        }
        console.log("here is your data",data)
        axios.post("http://localhost:8000/menus/create",{
         ...data


     }).then(response=>{

         console.log("inserted your dish",response.data)
         
         setinserted(true)



     })
         
        
        /*
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        var formData=new FormData()
        formData.append("data", JSON.stringify(data));
        formData.append("dp", dp);
        
        //alert("into add dish")
         async function add_dish(data) {
            await dispatch(addDish(data))
            
            setinserted(true)
 
          }
          add_dish(formData)
          */  
    };
    let redirectVar=null;
   
    if(localStorage.getItem("token")==null){
      redirectVar = <Redirect to= "/restologin"/>
  }
    if (inserted==true){
        redirectVar = <Redirect to="/restodash" />
    }
    return (
        <div>
            {redirectVar}
            <div className="register-form" style={{marginTop:"80px"}}>
           <h2><b>Add a dish</b></h2>
           <form onSubmit={handleAddDish} enctype="multipart/form-data">
              <div className="form-group">
                    <label>Name of the dish</label>
                    <input type="text" value={dish_name}  id="dish_name" className="form-control" placeholder="Enter the dish name" onChange={e => setdish_name(e.target.value)} required/>
                 </div>
                 <div className="form-group">
                    <label>Add a description </label>
                    <input type="text" value={dish_desc} id="dish_desc" className="form-control" placeholder="Add dish description" onChange={e => setdish_desc(e.target.value)} required/>
                 </div>
        


                 <div className="form-group">
                    <label>Add a price</label>
                    <input type="number" id="dish_price" value={dish_price} className="form-control" placeholder="Your dish price please" onChange={e => setdish_price(e.target.value)} required/>
                 </div>
                 <div className="form-group">
                    <label>Add cuisine type </label>
                    <input type="text" value={cuisine} id="cuisine" className="form-control" placeholder="Add dish description" onChange={e => setCuisine(e.target.value)} required/>
                 </div>
                 Availability:
                 <select>
                    <option value="Yes" onChange={e=>setAvailability(e.target.value)}>Yes</option>
                    <option value="No" onChange={e=>setAvailability(e.target.value)}>No</option>
                 </select>
        
        
                 
{/*                  
                 <div className="form-group">
                    <label>Upload Dish Picture</label><br />
                    <input type="file" id="dp" name="dp" onChange={e => setudishdp(e.target.files[0])} accept=".png,.gif,.jpeg,.jpg" />
                 </div> */}

                 <div className="col-sm">
                <div className="mainradio" data-toggle="buttons">
        
        <input type="radio" className="radio_button" value="pickup2" onChange={e=>setradioval2(e.target.value)} id="veg" name="options2" defaultChecked />
       <label for="veg" className="radio_label">veg</label>

        <input type="radio" className="radio_button" value="drop2" onChange={e=>setradioval2(e.target.value)} id="nonveg" name="options2" /> 
        <label for="nonveg" className="radio_label">non-veg</label>

          </div>      


                </div>



                 <h4 style={{color:"red"}}>{errors}</h4>

                 <button type="submit" className="btn btn-dark">Add Dish</button>
                 
              </form>
           </div>
        </div>
    )
}

export default CreateDish
