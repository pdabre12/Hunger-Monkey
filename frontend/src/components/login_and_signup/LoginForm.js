import React,{useState, useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {login} from '../../features/user_slice'
import {selectuser} from '../../features/user_slice'
import {Redirect} from 'react-router';
import cookie from 'react-cookies'
import {useCookies} from 'react-cookie'
import jwt_decode from 'jwt-decode'
//import * as jwt_decode from 'jwt-decode';
import {getCustLogin} from '../queries'
const LoginForm = () => {
    
    const [uemail,setuemail]=useState()
    const [upwd,setpassword]=useState()
    const [authtoken,settoken]=useState()
    const [usertype,setusertype]="customer"
    let [errors,seterrors]=useState()
    const dispatch = useDispatch()
    const [cookies, setCookie] = useCookies(["customer"]);
    useEffect(()=>{
        localStorage.removeItem("user_id");

    },[]);

    function handleLogin(e){
        var headers = new Headers();
        //prevent page from refresh
        
        e.preventDefault();
        const data = {
            email : uemail,
            upassword : upwd,
           
        }
        axios.post("http://localhost:4000/graphql/",{
            query:getCustLogin,
            variables:data


        }).then(response=>{
            console.log(response)
            if (!response.data.data.get_customer_login.email){
                seterrors("User does not exists or Invalid credentials")

            }
            else{
                localStorage.setItem("token", uemail);
            }

        })
        //set the with credentials to true
        /*
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(process.env.REACT_APP_BACKEND+'customerlogin',data)
            .then(response => {
                if(response.status === 200){
                    alert("successfull login")
                    //token.
                    console.log("here is the response---------->",response.data)
                    //settoken(response.data)
                    const current=String(response.data)
                    //var decoded=jwt_decode(response.data.split(' ')[1])
                    //console.log(" Here is the decoded version",decoded)
                    localStorage.setItem("token", response.data);

                    var decoded = jwt_decode(authtoken.split(' ')[1]);
                    console.log("here is the decoded---------->",decoded)
                    
                    
                    dispatch(login({
                        email:uemail,
                        userType:"customer",
                        //token:response.data
                        
                    }))
                    //settoken(response.data._id)
                    setCookie("email", uemail, {path: "/"});
                    
                    
                    }else if(response.status === 202){
                    
                    seterrors("User does not exists or Invalid credentials")


                    
                }
                else{
                    seterrors("Error reaching database")
                }
            });
                    
   */



        
      
    }
    
const user = useSelector(selectuser)

let redirectVar = null;
       
if(localStorage.getItem("token")!=null){
            console.log("loaded successfully")
            redirectVar = <Redirect to= "/userdash"/>
}
        
return (<div>
        {redirectVar}
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

export default LoginForm
