import React from 'react'
import Searchbar from './Searchbar'
import Vegnonvegoption from './Vegnonvegoption'
import Location from './Location' 
import './vegnonveg.css'
import {useState,useEffect} from 'react'
import Cart2 from './Cart2'
import {FaShoppingCart} from 'react-icons/fa'
import UserCart from './UserCart'
import { useCookies } from "react-cookie";
import Modal from 'react-modal'
import {useSelector,useDispatch} from 'react-redux'
import {selectuser,getfavourites} from '../../features/user_slice'
const Navbar = (props) => {
    const [checkbtn,setcheckbtn] = useState(false)
    const [radioval,setradioval]=useState("all")
    const [restname,setrestname]=useState("")
    const [restzip,setrestzip]=useState("")
    const [cookies, setCookie] = useCookies(["customer"]);
    function filterRestos(e){
        e.preventDefault()
    
        
    }
    const user = useSelector(selectuser)   
    return (
        <div className="wrapper container">
            
            <div id="sidenav">
            <nav className="navbar navbar-expand-lg fixed-top navbar-inner" >
        <div className="container-fluid navcontainer row" >
        
        <form id="search-form" class="form-inline" role="form" onSubmit={filterRestos}>
        
            <div className="col-sm brand" >
            <a className="navbar-brand"><img style={{border:0,width:"15rem"}} src="/HungerMonkey.png" /></a>
            </div>     
            <h4>Hello, {localStorage.getItem("user")}!!!!</h4>
          
            </form>
            
          
            
            <div style={{marginRight:"2rem"}} className="col-sm">
            
            <span class="input-group-btn">
            
                        <button onClick={()=>setcheckbtn(true)} class="btn btn-dark" data-target="#search-form" name="q">
                            <FaShoppingCart />
                              
		                 </button></span>
                        
                        < UserCart trigger={checkbtn} setTrigger={setcheckbtn}>
                        
                        <Cart2 setcheck={setcheckbtn} />

                         </ UserCart>

            </div>
        
        </div>
        
    </nav>
    </div>
        


        </div>
    )
}

export default Navbar