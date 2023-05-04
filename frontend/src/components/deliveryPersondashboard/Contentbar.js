import React from 'react'
import {BrowserRouter, Route , Switch} from 'react-router-dom'
import Resteraunts from './Resteraunts'
import UpdateProfile from './UpdateProfile'
import Userinfo from './Userinfo'
import PastOrders from './PastOrders'
import {Redirect} from 'react-router';
import cookie from 'react-cookies'
// import Cart from './Cart'
import RestoMenu from './RestoMenu'
import {useLocation} from 'react-router-dom'
// import Checkout from './Checkout'
import Favourites from './Favourites'
import Successful from './Successful'
import MyOrders from './MyOrders'
import {useEffect,useState} from 'react'
import Orders from './Orders'

const Contentbar = (props) => {

    let redirectVar = null;
 const location=useLocation()
     const [toggler,setToggler]=useState(false)
    if(localStorage.getItem("deliveryPerson")==null){
        redirectVar = <Redirect to= "/deliveryPersonlogin"/>
    }
 





    
    return (
            <BrowserRouter>
            
            <Switch>
            
            <Route exact path='/deliveryPersondash' 
            component={()=><Orders filters={props.filters} toggler={!toggler} setToggler={setToggler}/>} />
            {/* <Route path= "/deliveryPersondash/cart" component={Cart} />         */}
            <Route path="/deliveryPersondash/userupdate" component={UpdateProfile} />
            <Route path='/deliveryPersondash/userinfo' component={Userinfo} />
            <Route path="/deliveryPersondash/pastorders" component={PastOrders} />
            <Route path="/deliveryPersondash/restoprofile" component={RestoMenu} />
            {/* <Route path="/deliveryPersondash/checkout" component={Checkout} /> */}
            <Route path="/deliveryPersondash/favourites" component={Favourites} />
            <Route path="/deliveryPersondash/success" component={Successful} />
            <Route path="/deliveryPersondash/myorders" component={MyOrders} />
            <Route path="/deliveryPersondash/past" component={PastOrders} />
            </Switch></BrowserRouter>
      
    )
}

export default Contentbar
