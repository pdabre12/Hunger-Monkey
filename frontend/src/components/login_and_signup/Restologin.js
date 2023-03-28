import React,{useState,useEffect} from 'react'
import {login} from '../../features/user_slice'
import axios from 'axios';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import Cookies from 'universal-cookie' 
import {selectuser} from '../../features/user_slice'
import {Redirect} from 'react-router';
import { useCookies } from "react-cookie";
import jwt_decode from 'jwt-decode'
import {getRestoLogin,getRestoDetails} from '../queries'
import { useHistory } from 'react-router-dom';

const Restologin = () => {
    const history = useHistory();
    const [cookies, setCookie] = useCookies(["restaurant"]);
    const [uemail,setuemail]=useState()
    const [upwd,setpassword]=useState()
    const [update,setupdate]=useState(false)
    let [errors,seterrors]=useState()
    const dispatch = useDispatch()
    let redirectVar = null;
    useEffect(() => {
        
    }, [update])

    function handleLogin(e){
        var headers = new Headers();
        //prevent page from refresh
        console.log("yes");
        
        e.preventDefault();
        const data = {
            email : uemail,
            upassword : upwd,
            
        }
        console.log(data)
        axios.post("http://localhost:8000/restaurants/api/auth/login",{
            restaurant_email:data.email,
            password:data.upassword

        }).then(response=>{
            if (!response.status===200|!response.status==201){
                seterrors("User does not exists or Invalid credentials")

            }
            else{
                localStorage.setItem("token", uemail);
                console.log(localStorage.getItem('token'))
                history.push("/restodash")
            }

        })
        //set the with credentials to true
        /*
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(process.env.REACT_APP_BACKEND+'restologin',data)
            .then(response => {
                
                if(response.status === 200){
                    console.log("here is the data ------------------------->",response.data)
                    let restodata = jwt_decode(response.data.split(' ')[1])
                    localStorage.setItem("token", response.data);

                    console.log("here is restodata", restodata)
                    dispatch(login({
                        email:uemail,
                        userType:"restaurant_owner"
                    }))
                    setCookie("resteraunt_id", restodata._id, {path: "/"});
                    setCookie("resteraunt_name", restodata.resteraunt_name, {path: "/"});
                    setCookie("zipcode", restodata.zipcode, {path: "/"});
                    setCookie("restdp",restodata.restdp, {path: "/"});
                    console.log("here in successful login")
                    setupdate(!update)
                    }else{
                    
                    seterrors("User does not exists or Invalid credentials")


                    
                }
            });
            */





        
      
    }
    const user = useSelector(selectuser)

    
    if(localStorage.getItem("token")!=null){
        redirectVar = <Redirect to= "/restodash"/>
    }
    
    return (
        <div>
            {redirectVar}
        <div className="login-form">
            <h2><b> Resteraunt Owner Login</b></h2>
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
                  Dont have an account yet? <Link to="/restosignup">    
                  <button className="btn btn-dark" >Register</button>&nbsp;</Link>&nbsp;
               </form>
            
        </div></div>
    )
}

export default Restologin
