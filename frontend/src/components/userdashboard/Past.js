import React from 'react'
import React from 'react'
import Navbar from './Navbar'
import BootCdnUser from './BootCdnUser'
import BootCdn from './BootCdn'
import Contentbar from './Contentbar'
import {selectuser} from '../../features/user_slice'
import Sidebar from './SideBar'
import {useSelector,useDispatch} from 'react-redux'
import Prosidebar from './Prosidebar'
import {Redirect} from 'react-router';
import cookie from 'react-cookies'
import {useCookies} from 'react-cookie'
import {useState,useEffect} from 'react'
import axios from 'axios'

const Past = () => {
    const [cookies, setCookie] = useCookies(["customer"]);
    const [restos,setrestos] = useState([]);
    const user = useSelector(selectuser)
    console.log(user)
    let redirectVar = null;
    
    
    if(!cookie.load('cookie')){
        redirectVar = <Redirect to= "/userlogin"/>
    }
    console.log("here is the redirectvar",redirectVar)
    
    
    
    return (
        <div >
            {redirectVar}
            <BootCdn />
            <BootCdnUser />
            <Navbar />
            
            <div className="row">
                    <div className="col-md-3 userdashdiv" style={{marginTop:"50px"}}>
                        <Prosidebar />
                    </div>
                    <div className="col-md-9 userdashdiv" id="user-contentbar" >

                        
                    </div>
            </div>
            
        </div>
    )
}

export default Past
