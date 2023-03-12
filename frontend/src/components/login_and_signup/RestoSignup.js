import {React,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux'
import {signup} from '../../features/user_slice'
import {selectuser} from '../../features/user_slice'
import {Redirect} from 'react-router';
import {insert_owner,insert_resto} from '../mutation_queries'
const RestoSignup = () => {
    const [radioval,setradioval]=useState("all")
    const [radioval2,setradioval2]=useState("all")
    const [oname,setoname] = useState();
    const [oaddr,setoaddr] = useState();
    const [ozip,setozip] = useState();
    const [ocontact,setocontact] = useState();
    const [opwd,setopwd] = useState();
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
    const dispatch = useDispatch()
    const [diet,setdiet] = useState();
    let redirectVar = null
    
    
    
    
    async function handleRegister(e){

     

        e.preventDefault()
        let data = {
            fullname : oname,
            address:oaddr,
            zipcode:ozip,
            contact:ocontact,
            upassword : opwd,
            email:oemail,
            userdp:""
           
        }


        /*
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        let formData=new FormData()
        formData.append("data", JSON.stringify(data));
        formData.append("dp", dp);
        console.log(formData)
        */
        
      
      axios.post("http://localhost:4000/graphql/",{
                query:insert_owner,
                variables:{
                  email:oemail,
                  fullname : oname,
                  zipcode:ozip,
                  contact:ocontact,
                  address:oaddr,
                  upassword:opwd,
                  userdp:"https://ubereatscustomerimagesbucket.s3.amazonaws.com/sathesaurabh97.png",
                 
                            
                }
            }).then(response=>{
                //let dish_list = await dispatch(getDishes(data))
                if (response){
                  console.log("inserted owner successfully  now inserting restaurant")
                  let data2 = {
                     resteraunt_name : restname,
                     address:restaddr,
                     zipcode:restzip,
                     contact:restcontact,
                     owner_email:oemail,
                     diet:radioval,
                     pickup_drop:radioval2,
                     city:restcity,
                     restdesc:restdesc,
                     restdp:"https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Jack_in_the_Box_2009_logo.svg/1200px-Jack_in_the_Box_2009_logo.svg.png"
                     
                 }
                 axios.post("http://localhost:4000/graphql/",{
                  query:insert_resto,
                  variables:data2
              }).then(response=>{                  setinserted(true)
               console.log("inserted")}).catch(err=>{console.log(err)})




               }
               else{
                  console.log("faced an error")
               }
              }).catch(err=>{
                 console.log(err)
              })    

            

            
            
            
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
            <h2><b>New Business </b></h2>
               <form onSubmit={handleRegister}>
                  <div className="form-group">
                     <label>Owner Name</label>
                     <input type="text" id="oname" className="form-control" placeholder="Your Name" value={oname} onChange={e=>setoname(e.target.value)} required/>
                  </div>
                  <div className="form-group">
                     <label>Owner Address</label>
                     <input type="text" id="oaddr" className="form-control" value={oaddr} onChange={e=>setoaddr(e.target.value)} placeholder="Address" required/>
                  </div>
                  <div className="form-group">
                     <label>Owner Zipcode</label>
                     <input type="text" pattern="[0-9]{5}" id="ozip" className="form-control" value={ozip} onChange={e=>setozip(e.target.value)} placeholder="Address" required/>
                  </div>
         


                  <div className="form-group">
                     <label>Owner Contact No.</label>
                     <input type="tel" id="ocontact" className="form-control" value={ocontact} onChange={e=>setocontact(e.target.value)} placeholder="Your contact number please" required/>
                  </div>
         
                  <div className="form-group">
                     <label>Owner Email</label>
                     <input type="email" id="oemail" className="form-control" value={oemail} onChange={e=>setoemail(e.target.value)} placeholder="Your email address" required/>
                  </div>
                  
                  <div className="form-group">
                     <label>Password</label>
                     <input type="password" id="opwd" className="form-control" value={opwd} onChange={e=>setopwd(e.target.value)} placeholder="Password" required/>
                  </div>

                <div className="form-group">
                     <label>Confirm Password</label>
                     <input type="password" id="ocpwd" className="form-control" value={ocpwd} onChange={e=>setocpwd(e.target.value)} placeholder="Password" required/>
                  </div>
                  <div className="form-group">
                     <label>Upload a profile picture</label><br />
                     <input type="file" id="dp" name="dp" onChange={e => setdp(e.target.files[0])}  accept="image/x-png,image/gif,image/jpeg" />
                  </div>
                
                <hr />
                <h2><b>Restaurant details</b></h2>
                <hr />

                <div className="form-group">
                     <label>Restaurant Name</label>
                     <input type="text" id="restname" className="form-control" value={restname} onChange={e=>setrestname(e.target.value)} placeholder="Your Name" required/>
                  </div>
                  <div className="form-group">
                     <label>Restaurant Address</label>
                     <input type="text" id="restaddr" className="form-control" value={restaddr} onChange={e=>setrestaddr(e.target.value)} placeholder="Address" required/>
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
                     <label>Upload Restaurant Picture</label>
                     <br />
                     <input type="file" id="restdp" name="restdp" onChange={e => setrestdp(e.target.files[0])}  accept="image/x-png,image/gif,image/jpeg" />
                  </div>

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

                <hr />
                <h4 style={{color:"red"}}>{errors}</h4>
                <hr />
                  <button type="submit" className="btn btn-secondary">Register</button>
                  Already have an account? <Link to="/restologin">Login</Link>&nbsp;
               </form>
            </div>
        </div>
    )
}

export default RestoSignup
