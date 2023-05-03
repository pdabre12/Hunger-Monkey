import React from 'react'
import Navbar from './Navbar'
import BootCdnUser from './BootCdnUser'
import BootCdn from './BootCdn'
import Contentbar from './Contentbar'
import {selectuser} from '../../features/user_slice'

import {useSelector,useDispatch} from 'react-redux'
import Prosidebar from './Prosidebar'
import {Redirect} from 'react-router';
import cookie from 'react-cookies'
import {useCookies} from 'react-cookie'
import {useState,useEffect} from 'react'

import axios from 'axios'


const Userdash = () => {
    const [cookies, setCookie] = useCookies(["customer"]);
    const user = useSelector(selectuser)
    console.log(user)
    
    let redirectVar=null
    const [original_restos,setoriginal_restos]=useState([])
    let [restos_modified,setrestos]=useState([])
    const [filters,setfilters]=useState({restzip:"",
    restname:"",
    radioval:"all"})

    useEffect(()=>{

},[]);




if(localStorage.getItem("user")==null){
    console.log("loaded successfully")
    redirectVar = <Redirect to= "/userlogin"/>
}
    console.log("here is the redirectvar",redirectVar)
    
    




    return (
        <div >
            {redirectVar}
            <BootCdn />
            <BootCdnUser />
            <Navbar filters={filters} setfilters={setfilters} />
            
            <div className="row">
                    <div className="col-md-3 userdashdiv" style={{marginTop:"50px"}}>
                        <Prosidebar />
                    </div>
                    <div className="col-md-9 userdashdiv" id="user-contentbar" >

                        <Contentbar filters={filters}/>
                    </div>
            </div>
           
        </div>
    )
}

export default Userdash
