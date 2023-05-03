import React from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import './proside.css'
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import {useSelector,useDispatch} from 'react-redux'
import {logout} from '../../features/user_slice'
import {selectuser} from '../../features/user_slice'
import { useCookies } from "react-cookie";
import cookie from 'react-cookies'


const Prosidebar = () => {
    const dispatch = useDispatch()
    let redirectVar = null;
    const [cookies, setCookie,removeCookie] = useCookies(["restaurant"]);
    function handleLogout(){
 
        dispatch(logout())
        cookie.remove('cookie', { path: '/' })
        removeCookie("zipcode")
        removeCookie("resteraunt_id")
        removeCookie("resteraunt_name")
        removeCookie("restdp")

        redirectVar = <Redirect to= "/"/>
        localStorage.removeItem("resto");
        redirectVar = <Redirect to= "/"/>
      }
      

    return (
    
    <nav stye={{overflow:"hidden"}}>
        <ProSidebar style={{fontSize:"20px",marginBottom:"-5000px",paddingBottom:"5000px"}}>
  <Menu iconShape="square">
    <MenuItem ><a href="/restodash" >Dashboard</a></MenuItem>
    <hr />
    
   
    <MenuItem >
    <a href="/restodash/createdish" >Add Dish</a>
    </MenuItem>
    <hr />
    <MenuItem ><a href="/restodash/myorders" >My Orders</a></MenuItem>
    <hr />
    
    <MenuItem ><form onSubmit={handleLogout} action="/"><button style={{background:"transparent",border:"none",color:"#adb5bd"}}>Logout </button></form></MenuItem>
    
  </Menu>
</ProSidebar>
</nav>
    )
}

export default Prosidebar
