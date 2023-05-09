import React,{useState, useEffect} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {login} from '../../features/user_slice'
import {selectuser} from '../../features/user_slice'
import {Redirect} from 'react-router';
import cookie from 'react-cookies'
import {useCookies} from 'react-cookie'
import jwt_decode from 'jwt-decode'
import { useHistory } from "react-router-dom";

const LoginForm = () => {
    const history = useHistory();

    
    const [uemail,setuemail]=useState()
    const [upwd,setpassword]=useState()
    const [authtoken,settoken]=useState()
    const [usertype,setusertype]="customer"
    let [errors,seterrors]=useState()
    const dispatch = useDispatch()
    const [cookies, setCookie] = useCookies(["customer"]);
    useEffect(()=>{
        if(localStorage.getItem("user")!=null){
            history.push("/userdash")
        }
        ;

    },[]);

    const handleLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        
        e.preventDefault();
        const data = {
            email : uemail,
            upassword : upwd,
           
        }
        axios.post(process.env.REACT_APP_BACKEND+"user/api/auth/login",{
                email:data.email,
                password:data.upassword


        }).then(response=>{
            console.log(response)
            if (!response.status===200|!response.status==201){
                console.log(response)
                seterrors("User does not exists or Invalid credentials")

            }
            else{
                localStorage.setItem("user", uemail);
                    history.push("/userdash")
                 
        
            }

        })
        .catch(err=>
            {
                console.log(err)
                seterrors("User does not exists or Invalid credentials")
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
       
if(localStorage.getItem("user")!=null){
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
                     <input id="uemail" name="uemail" value={uemail} type="email" className="form-control" placeholder="Registered Email id" onChange={e => setuemail(e.target.value)} />
                  </div>
                  <div className="form-group">
                     <label>Password</label>
                     <input type="password" name ="upwd" value={upwd} id="upwd" className="form-control" placeholder="Password" onChange={e => setpassword(e.target.value)} />
                  </div>

                  
                  
                  <br/>

                  <button className="btn btn-black" type='submit' >Login</button>&nbsp; 
                  Dont have an account yet? <Link to="/usersignup">    
                  <button className="btn btn-dark" >Register</button>&nbsp;</Link>&nbsp;
               </form>
            </div>
            </div>
    )
}

export default LoginForm
