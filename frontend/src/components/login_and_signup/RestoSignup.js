import {React,useState,useRef,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux'
import {signup} from '../../features/user_slice'
import {selectuser} from '../../features/user_slice'
import {Redirect} from 'react-router';
import {insert_owner,insert_resto} from '../mutation_queries'

import { useHistory } from 'react-router';
import S3FileUpload from "react-s3";
import config from '../../config';


const RestoSignup = () => {
    const history = useHistory();
    const [radioval,setradioval]=useState("all")
    const [radioval2,setradioval2]=useState("both")
    const [oname,setoname] = useState();
    const [oaddr,setoaddr] = useState();
    const [ozip,setozip] = useState();
    const [ocontact,setocontact] = useState();
    const [pwd,setpwd] = useState();
    const [oemail,setoemail] = useState();
    const [ocpwd,setocpwd] = useState();
    const [dp,setdp] = useState();
    const [restdp,setrestdp] = useState();
    const [restname,setrestname] = useState();
    const [restaddr,setrestaddr] = useState();
    const [restcity,setrestcity] = useState();
    const [restdesc,setrestdesc] = useState();
    const [restzip,setrestzip] = useState();
    const [restcontact,setrestcontact] = useState();
    const [errors,seterrors] = useState();
    const [isnerted,setinserted]=useState()
    const [restemail,setrestemail] = useState();
    const dispatch = useDispatch()
    const [diet,setdiet] = useState();
    const [restcuisine,setrestcuisine] = useState();
    const [restopensat,setrestopensat] = useState(); 
    const [restclosesat,setrestclosesat] = useState(); 
    const [restdeliveryfee,setrestdeliveryfee] = useState();
    const [reststate,setreststate] = useState();
    const [restcountry,setrestcountry] = useState();


    let redirectVar = null
    
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const option = {
     componentRestrictions: { country: "us" },
     fields: ["address_components", "geometry", "icon", "name"],
     types: ["address"]
    };
    useEffect(() => {
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
       inputRef.current,
       option
      );
     }, []);

   
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
    
    async function handleRegister(e){

     

        e.preventDefault()
        let restaurant_data = {
            restaurant_name : restname,
            phone_number:parseInt(restcontact),
            password : pwd,
            restaurant_email:restemail,
            description: restdesc,
            type_of_dishes:radioval,
            delivery_type:radioval2,
            cuisine_type: restcuisine,
            // opens_at:restopensat,
            // closes_at:restclosesat,
            // delivery_fee:restdeliveryfee,
            type_of_dishes:radioval,
            restaurant_dp:dp,
            delivery_type:radioval2,
            street:restaddr,
            city:restcity,
            zipcode:parseInt(restzip)
           
        }

        console.log(restaurant_data)

      //   const address_data ={
      //    email:restemail,
      //    street:restaddr,
      //    city:restcity,
      //    state:reststate,
      //    country:restcountry,
      //    pincode:parseInt(restzip)

      //   }
      //   console.log(address_data)

        /*
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        let formData=new FormData()
        formData.append("data", JSON.stringify(data));
        formData.append("dp", dp);
        console.log(formData)
        */
        
      // console.log("Creating address data row first...")
      // axios.post("http://localhost:8000/addresses/create",
      // {
      //    ...address_data
      // }).then(res=>{
      //    console.log(res)
      //     restaurant_data = {
      //       ...restaurant_data,
      //       address_id:res.data.address.address_id

      //     }
      //     console.log(restaurant_data)
      //    })
         
      //    .catch(err=>{
      //       console.log(err)

      //  })

      console.log("creating restaurant data row now...")
      axios.post("http://localhost:8000/restaurants/api/auth/register",
               {
                  ...restaurant_data
               }
            )
            
            .then(res=>{
               console.log(res.data)
               localStorage.setItem("resto", restemail);
               
               localStorage.setItem("restaurantdp",dp);
               console.log(localStorage.getItem('restaurantdp'))
               history.push("/restodash")
               })
               
               .catch(err=>{
                  console.log(err)
      
             })
                //let dish_list = await dispatch(getDishes(data))
            //     if (response){
            //       console.log("inserted owner successfully  now inserting restaurant")
            //       .then(response=>{                  
               
            //    setinserted(true)
            //    console.log(res)})

            //    .catch(err=>{console.log(err)})




            //    }
            //    else{
            //       console.log("faced an error")
            //    }
            //   }).catch(err=>{
            //      console.log(err)
            //   })    

            

            
            
            
            /*
            console.log("in the frontend side where we found out")
            let formData2=new FormData()
            formData2.append("data", JSON.stringify(data2));
            formData2.append("restdp", restdp);

            
            const [firstResponse] = await Promise.all([
                axios.post(process.env.REACT_APP_BACKEND+'owner_signup',formData),
              ]);
              console.log("completed owner signup")
              if(firstResponse.status==200 || firstResponse.status==202){
              const [secondResponse] = await Promise.all([
                axios.post(process.env.REACT_APP_BACKEND+'restosignup',formData2)
            ]);

            if(secondResponse.status==200 ){
              
               console.log("data insertion sucessful")
               setinserted(true)
               

           }
           else{
               console.log("data insertion unsucessful")
           }
       
         }
            
*/
           
            
    }
    const user = useSelector(selectuser)

    
        
   
        if(isnerted){
            redirectVar = <Redirect to= "/restologin"/>
        }  
    
    return (
        <div>
            {redirectVar}
            <div className="register-form sticktop">
            {/* <h2><b>New Business </b></h2> */}
               <form onSubmit={handleRegister}>
                  
                  
                 
                
                <hr />
                <h2><b>Restaurant Admin Registration</b></h2>
                <hr />

                <div className="form-group">
                <p>{errors}</p>
                     <label>Restaurant Name</label>
                     <input type="text" id="restname" className="form-control" value={restname} onChange={e=>setrestname(e.target.value)} placeholder="Your Name" required/>
                  </div>
                  <div className="form-group">
                     <label>Restaurant Email</label>
                     <input type="email" id="restemail" className="form-control" value={restemail} onChange={e=>setrestemail(e.target.value)} placeholder="Your Name" required/>
                  </div>
                  <div className="form-group">
                     <label>Restaurant Address</label>
                     <input type="text" id="restaddr" ref={inputRef} onSelect={e=>setrestaddr(e.target.value)} className="form-control" value={restaddr} onChange={e=>setrestaddr(e.target.value)} placeholder="Address" required/>
                  </div>
                  <div className="form-group">
                     <label>Restaurant City</label>
                     <input type="text" id="restaddr" className="form-control" value={restcity} onChange={e=>setrestcity(e.target.value)} placeholder="City" required/>
                  </div>
            
                  <div className="form-group">
                     <label>Restaurant Description</label>
                     <input type="text" id="restdesc" className="form-control" value={restdesc} onChange={e=>setrestdesc(e.target.value)} placeholder="Description" required/>
                  </div>
                  <div className="form-group">
                     <label>Restaurant Zipcode</label>
                     <input type="text" pattern="[0-9]{5}" id="restzip" className="form-control" value={restzip} onChange={e=>setrestzip(e.target.value)} placeholder="Zipcode" required/>
                  </div>
                  <div className="form-group">
                     <label>Cuisine Type</label>
                     <input type="text" id="restcuisine" className="form-control" value={restcuisine} onChange={e=>setrestcuisine(e.target.value)} placeholder="Cuisine" required/>
                  </div>
                 
                  
{/*          
                  <div className="form-group">
                     <label>Upload Restaurant Picture</label>
                     <br />
                     <input type="file" id="restdp" name="restdp" onChange={e => setrestdp(e.target.files[0])}  accept="image/x-png,image/gif,image/jpeg" />
                  </div> */}

                  <div className="form-group">
                     <label>Restaurant Contact No.</label>
                     <input type="tel" id="restcontact" className="form-control" value={restcontact} onChange={e=>setrestcontact(e.target.value)} placeholder="Your contact number please" required/>
                  </div>
                  <h4>Types of dishes served</h4>
                  <div className="col-sm">    
            <div className="mainradio" data-toggle="buttons">
                
              <input type="radio" value="all" onChange={e=>setradioval(e.target.value)} className="radio_button" id="all" name="options2" defaultChecked/>
              <label for="all" className="radio_label">all</label>
    
             <input type="radio" className="radio_button" value="veg" onChange={e=>setradioval(e.target.value)} id="veg" name="options2"  />
             <label for="veg" className="radio_label">veg</label>
    
              <input type="radio" className="radio_button" value="nonveg" onChange={e=>setradioval(e.target.value)} id="nonveg" name="options2" /> 
              <label for="nonveg" className="radio_label">non-veg</label>
    
                </div>      
            </div>
            <h4>Delivery Options?</h4>
            <div className="col-sm">    
            <div className="mainradio" data-toggle="buttons">
                
              <input type="radio" value="all" onChange={e=>setradioval2(e.target.value)} className="radio_button" id="both" name="options" defaultChecked/>
              <label for="both" className="radio_label">both</label>
    
             <input type="radio" className="radio_button" value="pickup" onChange={e=>setradioval2(e.target.value)} id="pickup" name="options"  />
             <label for="pickup" className="radio_label">pickup</label>
    
              <input type="radio" className="radio_button" value="delivery" onChange={e=>setradioval2(e.target.value)} id="drop" name="options" /> 
              <label for="drop" className="radio_label">drop</label>
    
                </div>      
            </div>
            <div className="form-group">
                     <label>Password</label>
                     <input type="password" id="pwd" className="form-control" value={pwd} onChange={e=>setpwd(e.target.value)} placeholder="Password" required/>
                  </div>

                <div className="form-group">
                     <label>Confirm Password</label>
                     <input type="password" id="ocpwd" className="form-control" value={ocpwd} onChange={e=>setocpwd(e.target.value)} placeholder="Password" required/>
                  </div>
                  <div className="form-group">
                     <label>Upload a profile picture</label><br />
                     <input type="file" id="dp" name="dp" onChange={upload}  accept="image/x-png,image/gif,image/jpeg" />
                  </div>
                
                <hr />
                <hr />
                  <button type="submit" className="btn btn-secondary">Register</button>&nbsp;
                  Already have an account? <span></span><Link to="/restologin">Login</Link>&nbsp;
               </form>
            </div>
        </div>
    )
}

export default RestoSignup
