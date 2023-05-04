import React from 'react'
import Navbar from './Navbar'
import BootCdnUser from './BootCdnUser'
import BootCdn from './BootCdn'

import Contentbar from './Contentbar'
import Prosidebar from './Prosidebar'
import cookie from 'react-cookies'
import {Redirect} from 'react-router-dom'
import {useState} from 'react'
const RestoDash = () => {
    const [coll,setcollapse]=useState(false)
    let redirectVar=null
    if(localStorage.getItem("resto")==null){
        redirectVar = <Redirect to= "/restologin"/>
    }
    console.log("tokennnnnnn----------->",localStorage.getItem("resto"))
    return (
        <div >
            {redirectVar}
            <BootCdn />
            <BootCdnUser />
            <Navbar collapser={coll} setcollapse={setcollapse}/>
            
            <div className="row">
                    <div className="col-md-3 userdashdiv" style={{marginTop:"50px"}}>
                        <Prosidebar collapsed={false}/>
                    </div>
                    <div className="col-md-9 userdashdiv" id="user-contentbar" >

                        <Contentbar />
                    </div>
            </div>
            
        </div>
    )
}

export default RestoDash
