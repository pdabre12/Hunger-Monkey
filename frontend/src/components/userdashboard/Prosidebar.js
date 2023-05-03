import React from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import './proside.css'
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import {useSelector,useDispatch} from 'react-redux'
import {logout} from '../../features/user_slice'
import {selectuser} from '../../features/user_slice'
import cookie from 'react-cookies'

const Prosidebar = () => {
  const dispatch = useDispatch()
  let redirectVar = null;
function handleLogout(){
 
  dispatch(logout())
  cookie.remove('cookie', { path: '/' })
  localStorage.removeItem("user");
  redirectVar = <Redirect to= "/"/>
}


    
if(localStorage.getItem("user")==null || localStorage.getItem("user").length==0 ){
    redirectVar = <Redirect to= "/userlogin"/>
}

    return (
      <div>{redirectVar}
    <nav style={{overflow:"hidden"}}>
        <ProSidebar id= "sidenav" style={{fontSize:"20px"}}>
  <Menu iconShape="square">
    <MenuItem ><a href="/userdash" >Dashboard</a></MenuItem>
    <hr />
    <MenuItem >
    <a href="/userdash/userupdate" >Update Profile</a>
    </MenuItem>
    <hr />
    {/* <MenuItem ><a href="/userdash/favourites" >Favourites</a></MenuItem>
    <hr /> */}
    
    <MenuItem ><a href="/userdash/myorders" >My Orders</a></MenuItem>
    <hr />
   
    <MenuItem ><a href="/userdash/cart" >Your Cart</a></MenuItem>
    <hr />
    <MenuItem ><form onSubmit={handleLogout} action="/"><button style={{background:"transparent",border:"none",color:"#adb5bd"}}>Logout </button></form></MenuItem>
    
  </Menu>
</ProSidebar>
</nav>
</div>
    )
}

export default Prosidebar
