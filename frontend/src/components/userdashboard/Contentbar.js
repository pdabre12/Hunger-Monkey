import React from 'react'
import {BrowserRouter, Route , Switch} from 'react-router-dom'
import Resteraunts from './Resteraunts'
import UpdateProfile from './UpdateProfile'
import Userinfo from './Userinfo'
import PastOrders from './PastOrders'
import {Redirect} from 'react-router';
import cookie from 'react-cookies'
import Cart from './Cart'
import RestoMenu from './RestoMenu'
import {useLocation} from 'react-router-dom'
import Checkout from './Checkout'
import Favourites from './Favourites'
import Successful from './Successful'
import MyOrders from './MyOrders'
import {useEffect,useState} from 'react'
import axios from 'axios'
import CancelCheckout from './CancelCheckout'

const Contentbar = (props) => {

    let redirectVar = null;
 const location=useLocation()
     const [toggler,setToggler]=useState(false)
    if(!cookie.load('cookie')){
        redirectVar = <Redirect to= "/userlogin"/>
    }
 





    
    return (
            <BrowserRouter>
            
            <Switch>
            
            <Route exact path='/userdash/' component={()=><Resteraunts filters={props.filters} toggler={!toggler} setToggler={setToggler}/>} />
            <Route path= "/userdash/cart" component={Cart} />        
            <Route path="/userdash/userupdate" component={UpdateProfile} />
            <Route path='/userdash/userinfo' component={Userinfo} />
            <Route path="/userdash/pastorders" component={PastOrders} />
            <Route path="/userdash/restoprofile" component={RestoMenu} />
            <Route exact path="/userdash/checkout" component={Checkout} />
            <Route path="/userdash/favourites" component={Favourites} />
            <Route path="/userdash/success" component={Successful} />
            <Route path="/userdash/myorders" component={MyOrders} />
            <Route path="/userdash/past" component={PastOrders} />
            
            </Switch></BrowserRouter>
      
    )
}

export default Contentbar
