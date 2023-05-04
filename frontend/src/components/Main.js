import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Userdash from './userdashboard/Userdash'
import Resteraunts from './userdashboard/Resteraunts'
import Userinfo from './userdashboard/Userinfo'
import MainLoginForm from './login_and_signup/MainLoginForm'
import MainSignupForm from './login_and_signup/MainSignupForm'
import Dashboard from './dashboard/Dashboard'
import RestoMainLogin from './login_and_signup/RestoMainLogin'
import RestoMainSignup from './login_and_signup/RestoMainSignup'
import Restodash from './restodashboard/Restodash'
import RestoMenu from './dashboard/RestoMenu'
import Example from './Example';
import DeliveryPersonDash from './deliveryPersondashboard/DeliveryPersonDash';
import Test from './deliveryPersondashboard/Test';
import DeliveryPersonMainSignupForm from './login_and_signup/DeliveryPersonMainSignupForm';
import DeliveryPersonMainLoginForm from './login_and_signup/DeliveryPersonMainLoginForm';
import Maps2 from './deliveryPersondashboard/Maps2';
import CancelCheckout from './userdashboard/CancelCheckout';
import SuccessCheckout from './userdashboard/SuccessCheckout';
class Main extends Component {
    render(){
        return(
            <div>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/main" component={Dashboard} />
                
                <Route path="/userlogin" component={MainLoginForm} />
                <Route path="/usersignup" component={MainSignupForm} />
                <Route path="/restologin" component={RestoMainLogin} />
                <Route path="/restosignup" component={RestoMainSignup} />
                <Route path = "/userdash" component={Userdash} />
                <Route path="/home" component={Userdash} />
                <Route path="/deliveryPersondash" component={DeliveryPersonDash}/>
                <Route path="/deliveryPersonlogin" component={DeliveryPersonMainLoginForm}/>
                <Route path="/deliveryPersonsignup" component={DeliveryPersonMainSignupForm}/>
               
                <Route path="/resteraunts" component={Resteraunts} />
                <Route path="/user" component={Userinfo} />
                <Route path="/userdash/home" component={Resteraunts} />
                <Route path="/restodash" component={Restodash} />
                <Route path="/main/restoProfile" component={RestoMenu} />
                <Route path="/example" component={Test} />
                <Route path="/testMap" component={Maps2} />
                <Route exact path="/cancelcheckout" component={CancelCheckout} />
                <Route exact path="/successcheckout" component={SuccessCheckout} />
                </div>
                


        )
    }
}
//Export The Main Component
export default Main;