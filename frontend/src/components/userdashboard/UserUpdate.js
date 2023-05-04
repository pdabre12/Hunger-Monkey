import React from 'react'

const UserUpdate = () => {

    function handleUpdate(e){
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(process.env.REACT_APP_BACKEND+'updateUser',data)
            .then(response => {
                console.log(response)
                if(response.status === 200){
                    alert("successfull update")
                    }else{
                    
                    seterrors("User does not exists or Invalid credentials")


                    
                }
            });





        
      
    }
    
    return (
        <div>
            <div className="login-form" >
            <h2><b>Customer Login</b></h2>
               <p>{errors}</p>
               <form onSubmit={handleLogin}>
                  <div className="form-group">
                     <label>Email</label>
                     <input id="uemail" value={uemail} type="email" className="form-control" placeholder="Registered Email id" onChange={e => setuemail(e.target.value)} />
                  </div>
                  <div className="form-group">
                     <label>Password</label>
                     <input type="password" value={upwd} id="pwd" className="form-control" placeholder="Password" onChange={e => setpassword(e.target.value)} />
                  </div>

                  
                  
                  <br/>

                  <button type="submit" className="btn btn-black" >Login</button>&nbsp; 
                  Dont have an account yet? <Link to="/usersignup">    
                  <button className="btn btn-dark" >Register</button>&nbsp;</Link>&nbsp;
               </form>
            </div>
            
        </div>
    )
}

export default UserUpdate
