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
import S3FileUpload from 'react-s3/lib/ReactS3';
import config from '../../config';
const CreateDish = () => {
   
    const [inserted, setinserted] = useState(false);
    const [cookies, setCookie] = useCookies(["restaurant"]);
    const [dish_name,setdish_name] = useState();
    const [dish_desc,setdish_desc] = useState();
    const [dish_price,setdish_price] = useState();
    const [availability,setAvailability] = useState("true");
    const [cuisine,setCuisine] = useState();
    
    const [dp,setdp] = useState();
    const [errors,seterrors]=useState();
    const [radioval2,setradioval2]=useState("veg");
    const dispatch=useDispatch() 


    const upload = (e) =>{
        S3FileUpload.uploadFile(e.target.files[0],config)
        .then((data)=>{
           console.log(data.location)
           setdp(data.location)
        })
        .catch(err=>{
           console.log(err)
        })
  
      }

    function handleAddDish(e){
        var headers = new Headers();
    
        e.preventDefault();
        const data = {
          
            dish_name:dish_name,
            restaurant_email:localStorage.getItem("resto"),
            // zipcode:cookies.zipcode,
            description:dish_desc,
            price:Number(dish_price),
            food_type:radioval2,
            availability:availability,
            cuisine:cuisine,
            menu_dp:dp

            // dishdp: "https://ubereatsdishimages.s3.us-east-2.amazonaws.com/Smash%20Burger94103French%20Fries.JPG"
            
        }
        console.log("here is your data",data)
        axios.post(process.env.REACT_APP_BACKEND+"menus/create",{
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
   
    if(localStorage.getItem("resto")==null){
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
                    <option value="yes" onSelect={e=>setAvailability(e.target.value)}>Yes</option>
                    <option value="no" onSelect={e=>setAvailability(e.target.value)}>No</option>
                 </select>
        
        
                 
                 <br/>
                 <div className="form-group">
                 <br/>
                     <label>Upload a profile picture</label><br />
                     <input type="file" id="dp" name="dp" onChange={upload}  accept="image/x-png,image/gif,image/jpeg" />
                  </div>

                 <div className="col-sm">
                <div className="mainradio" data-toggle="buttons">
        
        <input type="radio" className="radio_button" value="veg" onChange={e=>setradioval2(e.target.value)} id="veg" name="options2" defaultChecked />
       <label for="veg" className="radio_label">veg</label>

        <input type="radio" className="radio_button" value="non-veg" onChange={e=>setradioval2(e.target.value)} id="nonveg" name="options2" /> 
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
