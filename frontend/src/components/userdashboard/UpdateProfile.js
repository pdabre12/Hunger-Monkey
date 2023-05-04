import React, { useEffect } from 'react'
import {useState} from 'react'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import {selectuser} from '../../features/user_slice'
import {Redirect} from 'react-router';

import {updateUser} from '../../features/user_slice'
const UpdateProfile = () => {

    const [uaddr,setuaddr] = useState();
    const [uzip,setuzip] = useState();
    const [ucontact,setucontact] = useState();
    const[userid,setuserid]=useState('')
    const[email,setEmail]=useState('')
    const [udp,setudp] = useState();
    const [ucity,setucity] = useState();
    const [updated,setupdated] = useState(false);
    const [errors,seterrors]=useState();
    const user = useSelector(selectuser)
    const dispatch=useDispatch()
    let redirectVar=null
    

    const handleUpdate = (e) =>{
      console.log("here----------------------------------->")
      e.preventDefault();
     let data={
        address:uaddr,
        zipcode:uzip,
        contact:ucontact,
        city:ucity,
        // user_type:"customer"
     }
    
  //    console.log("here int the update------------------->")
  //   async function update(data) {
  //       await dispatch(updateUser(data))
  //       setupdated(!updated)
  //       alert("user details updated ")
      
  //     }
  //     update(data)
  console.log(data)

  axios.patch(`http://localhost:8000/profile/${localStorage.getItem("user")}`,{
     ...data
  })
  .then(res=>{
     console.log("updated the user!!");
     alert("User details updated!")
     setupdated(true)
  })
  .catch(err=>{
     console.log(err)
     seterrors(err)
  })
        


       
   }

   
       
        useEffect(()=>{
         
         if(localStorage.getItem("user")==null){
            redirectVar = <Redirect to= "/userlogin"/>
        }
            
           let tok =localStorage.getItem("token")
         axios.defaults.headers.common['authorization'] = tok;
         axios.get(`http://localhost:8000/profile/${localStorage.getItem('user')}`).then(response=>{
            
            if(response.status === 200)
            {
                
                console.log(response.data,typeof response.data)
                setEmail(response.data.user_email)
                setuaddr(response.data.address)
                setuzip(response.data.zipcode)           
                setucontact(response.data.phoneNumber)
                setucity(response.data.city)
            }
            else if(response.status === 202)
            {
                console.log("no data found")
            }
 
    })
        },[]);
        

     
     if(updated){
      redirectVar = <Redirect to= "/userdash"/>
  }
    return (
        <div>
        {redirectVar}
            
           <div className="register-form" style={{marginTop:"80px"}}>
           <h2><b>Update Profile</b></h2>
           <form onSubmit={handleUpdate}>
              <div className="form-group">
                    <label>Address</label>
                    <input type="text" value={uaddr}  id="uaddr" className="form-control" placeholder="Address" onChange={e => setuaddr(e.target.value)} required/>
                 </div>
                 <div className="form-group">
                    <label>Zipcode</label>
                    <input type="text" value={uzip} pattern="[0-9]{5}" id="uzip" className="form-control" placeholder="Address" onChange={e => setuzip(e.target.value)} required/>
                 </div>
                 <div className="form-group">
                     <label>City</label>
                     <input type="" value={ucity}  id="ucity" className="form-control" placeholder="City" onChange={e => setucity(e.target.value)} required/>
                  </div>
        


                 <div className="form-group">
                    <label>Contact No.</label>
                    <input type="tel" id="ucontact" value={ucontact} className="form-control" placeholder="Your contact number please" onChange={e => setucontact(e.target.value)} required/>
                 </div>
        
                 
                 
                 
                 <h4 style={{color:"red"}}>{errors}</h4>

                 <button type="submit"  className="btn btn-dark">Update</button>
                 
              </form>
           </div>
           </div>
    )
}

export default UpdateProfile
