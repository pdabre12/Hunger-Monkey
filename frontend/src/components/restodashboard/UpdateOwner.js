import React from 'react'
import {useState} from 'react'

const UpdateOwner = () => {

    const [uaddr,setuaddr] = useState();
    const [uzip,setuzip] = useState();
    const [ucontact,setucontact] = useState();
    const [udp,setudp] = useState();
    const [errors,seterrors]=useState();
    

    let redirectVar=null
    /*
    if(!user){
        redirectVar = <Redirect to="/userlogin"/>
        }
        */
       function handleUpdate(){
           
       }
    return (
        <div>
        {redirectVar}
            
           <div className="register-form" style={{marginTop:"80px"}}>
           <h2><b>Update Profile</b></h2>
           <form onSubmit={handleUpdate} enctype="multipart/form-data">
              <div className="form-group">
                    <label>Address</label>
                    <input type="text" value={uaddr}  id="uaddr" className="form-control" placeholder="Address" onChange={e => setuaddr(e.target.value)} required/>
                 </div>
                 <div className="form-group">
                    <label>Zipcode</label>
                    <input type="text" value={uzip} pattern="[0-9]{5}" id="uzip" className="form-control" placeholder="Address" onChange={e => setuzip(e.target.value)} required/>
                 </div>
        


                 <div className="form-group">
                    <label>Contact No.</label>
                    <input type="tel" id="ucontact" value={ucontact} className="form-control" placeholder="Your contact number please" onChange={e => setucontact(e.target.value)} required/>
                 </div>
        
                 
                 
                 <div className="form-group">
                    <label>Upload Profile Picture</label><br />
                    <input type="file" id="dp" name="dp" onChange={e => setudp(e.target.files[0])} accept=".png,.gif,.jpeg,.jpg" />
                 </div>
                 <h4 style={{color:"red"}}>{errors}</h4>

                 <button type="submit" className="btn btn-dark">Update</button>
                 
              </form>
           </div>
           </div>
    )
}

export default UpdateOwner
