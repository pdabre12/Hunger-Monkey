import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux'
import {signup} from '../../features/user_slice'
import {selectuser} from '../../features/user_slice'
import {generatePath, Redirect} from 'react-router';
import countrieslist from './countries';
import {insert_customer} from '../mutation_queries'
import {gql} from 'apollo-boost'
import { useHistory } from 'react-router';
const SignupForm = () => {
    const [firstname,setfirstname] = useState();
    const [lastname,setlastname] = useState();

    const history = useHistory();
   
    const [ucontact,setucontact] = useState();
    const [upwd,setupwd] = useState();
    const [uemail,setuemail] = useState();
    const [ucpwd,setucpwd] = useState();
    const [gender,setGender] = useState("Male");
    
    const [errors,seterrors]=useState();
    const [inserted,setinserted]=useState(false);

    const [persona,setPersona] = useState("Customer");    
    const dispatch = useDispatch()

    console.log(countrieslist)
    function handleRegister(e){
        var headers = new Headers();
        //prevent page from refresh
         // var CustomerSignupQuery=`mutation CreateCustomer($email:String!,$fullname:String!,$zipcode:String!,$contact:String!,$address:String!,$upassword:String!,$city:String!,$country:String!,$userdp:String!){
         //    insert_cust(email:$email,fullname:$fullname,zipcode:$zipcode,contact:$contact,address:$address,upassword:$upassword,city:$city,country:$country,userdp:$userdp){
         //       email
         //    }
               
         //  }
          
         // `    
         e.preventDefault();
        const data = {
         
         firstName : firstname,
         lastName:lastname,
         user_email:uemail,
         phoneNumber:parseInt(ucontact),
         password:upwd,
         user_gender: gender,
         role:persona


     
            
            
            
            
            
            
        
        }
        console.log(data);
      axios.post("http://127.0.0.1:8000/user/api/auth/register",{
                ...data
                  // userdp:"https://ubereatscustomerimagesbucket.s3.amazonaws.com/sathesaurabh97.png",
                
                            
                
            }).then(response=>{
                //let dish_list = await dispatch(getDishes(data))
                console.log("yes",response)
                if (response.status===200|response.status===201){
            //     dispatch(signup({
            //       email:uemail,
            //       userType:"customer"
                  
            //   }))
                  setinserted(true) 
            //       console.log(response)
                  console.log(response)
                  localStorage.setItem("token", uemail);
                  console.log(localStorage.getItem('token'))
                  history.push("/userdash")
               }
               else{
                  console.log("faced an error")
               }
              }).catch(err=>{
                 console.log(err)
              })
       
    }
    let redirectVar = null;
    if(localStorage.getItem("token")!=null){
      console.log("loaded successfully")
      redirectVar = <Redirect to= "/userdash"/>
}
else if (inserted){
   redirectVar = <Redirect to= "/userlogin"/>
}

var genderList=`Male,Female,Do Not want to Specify`
let genderlist=genderList.split(",")

let options=genderlist.map((gender)=>{return <option value={gender}>{gender}</option>})

var personaList=`Customer,Delivery Person`
let personalist=personaList.split(",")

let personaOptions=personalist.map((persona)=>{return <option value={persona}>{persona}</option>})

    return (
        <div>
         {redirectVar}
         
            <div className="register-form">
            <h2><b>Customer Registration</b></h2>
                
               <form onSubmit={handleRegister} enctype="multipart/form-data">
                  <div className="form-group">
                     <label>First Name</label>
                     <input type="text" value={firstname} id="firstname" className="form-control" placeholder="Your Name" onChange={e => setfirstname(e.target.value)} required/>
                  </div>
                  <div className="form-group">
                     <label>Last Name</label>
                     <input type="text" value={lastname} id="lastname" className="form-control" placeholder="Your Name" onChange={e => setlastname(e.target.value)} required/>
                  </div>
                  {/* <div className="form-group">
                     <label>Address</label>
                     <input type="text" value={uaddr} id="uaddr" className="form-control" placeholder="Address" onChange={e => setuaddr(e.target.value)} required/>
                  </div>
                  <div className="form-group">
                     <label>Zipcode</label>
                     <input type="text" value={uzip} pattern="[0-9]{5}" id="uzip" className="form-control" placeholder="Address" onChange={e => setuzip(e.target.value)} required/>
                  </div>
                  <div className="form-group">
                     <label>City</label>
                     <input type="" value={ucity}  id="ucity" className="form-control" placeholder="City" onChange={e => setucity(e.target.value)} required/>
                  </div> */}
                  {/* <div className="form-group">
                     <label>Country</label>
                     <select value={ucountry}  id="ucountry" className="form-control" onChange={e => setucountry(e.target.value)} required style={{width:"50%"}}>
                        {options}
                     </select>
                  </div> */}

                  <div className="form-group">
                     <label>Contact No.</label>
                     <input type="tel" id="ucontact" value={ucontact} className="form-control" placeholder="Your contact number please" onChange={e => setucontact(e.target.value)} required/>
                  </div>
         
                  <div className="form-group">
                     <label>Email</label>
                     <input type="email" id="uemail" value={uemail} className="form-control" placeholder="Your email address" onChange={e => {setuemail(e.target.value);seterrors("")}} required/>
                  </div>
                  
                  <div className="form-group">
                     <label>Password</label>
                     <input type="password" id="upwd" value={upwd} className="form-control" onChange={e => setupwd(e.target.value)} placeholder="Password" required/>
                  </div>

                <div className="form-group">
                     <label>Confirm Password</label>
                     <input type="password" id="ucpwd" value={ucpwd} className="form-control" onChange={e => setucpwd(e.target.value)} placeholder="Password" required/>
                  </div>

                  <div className="form-group">
                  <label>User Gender</label>
                     <select value={gender}  id="gender" className="form-control" onChange={e => setGender(e.target.value)} required style={{width:"50%"}}>
                        {options}
                     </select>
                  </div>

                  <div className="form-group">
                  <label>User Persona</label>
                     <select value={persona}  id="persona" className="form-control" onChange={e => setPersona(e.target.value)} required style={{width:"50%"}}>
                        {personaOptions}
                     </select>
                  </div>
                
                  {/* <div className="form-group">
                     <label>Upload Profile Picture</label><br />
                     <input type="file" id="dp" name="dp" onChange={e => setudp(e.target.files[0])} accept=".png,.gif,.jpeg,.jpg" />
                  </div> */}
                  <h4 style={{color:"red"}}>{errors}</h4>

                  <button type="submit" className="btn btn-dark">Register</button>
                  <br />
                  Already have an account? <Link to="/userlogin">Login</Link>&nbsp;
               </form>
            </div>
            </div>
    )
               }
export default SignupForm
         