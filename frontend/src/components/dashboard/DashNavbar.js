import React from 'react'
import {useState,useEffect} from 'react'
import Checkout from './Checkout'
import Cart from './Cart'
import {FaShoppingCart} from 'react-icons/fa'
const Navbar = (props) => {
    const [checkbtn,setcheckbtn] = useState(false)
    const [radioval,setradioval]=useState("all")
    const [restname,setrestname]=useState("")
    const [restzip,setrestzip]=useState("")
    function filterRestos(e){
        e.preventDefault()
      
        let radio_filtered=[]
        let name_filtered=[]
        let zip_filtered=[]
        let final=[]        
        if(radioval!="all"){
            radio_filtered = props.orestos.filter(resto => resto.pickup_drop === radioval)
            final=radio_filtered 
        }
        else{
            radio_filtered=props.orestos
            final=radio_filtered 
        }
        if(restzip.length!="" & restzip.length==5){
            console.log("in the restzip",restzip)
            zip_filtered = radio_filtered.filter(resto => resto.zipcode === restzip)
            final=zip_filtered 
        }
        
        console.log("restname is ",restname.length)
        if(restname.length!=0){
            console.log("in the restname",restname)
            name_filtered = zip_filtered.filter(resto => resto.resteraunt_name === restname)
            final=name_filtered 
        }
          
         
        console.log("filtered_list by radio",radio_filtered)
        console.log("filtered_list by zip",zip_filtered)
        console.log("filtered_list by name",name_filtered)
        console.log(final)
        props.setrestos(final)
        
    }
    return (
        <div>
            {console.log(radioval)}
            <nav id="user-nav" className="navbar navbar-expand-lg fixed-top navbar-inner" >
        <div className="container-fluid navcontainer row" >
        
        <div class="navbar-header">
                
        </div>
        <div className="collapse navbar-collapse" id="main-navbar-collapse">
        <form id="search-form" class="form-inline" role="form" onSubmit={filterRestos}>
            <div className="col-sm brand" >
            <a className="navbar-brand"><img style={{border:0}} src="/ue2.png" /></a>
            
            </div>
            <div className="col-sm">    
            <div class="input-group">
        <input type="text" value={restzip} class="form-control location-form" onChange={e => setrestzip(e.target.value)} placeholder="Enter Zipcode" />
        
        </div>
            </div>
            
                
            
            <div className="col-sm">    
            <div className="mainradio" data-toggle="buttons">
        
              <input type="radio" value="all" onChange={e=>setradioval(e.target.value)} className="radio_button" id="all" name="options" defaultChecked/>
              <label for="all" className="radio_label">all</label>
    
             <input type="radio" className="radio_button" value="pickup" onChange={e=>setradioval(e.target.value)} id="veg" name="options"  />
             <label for="veg" className="radio_label">pickup</label>
    
              <input type="radio" className="radio_button" value="drop" onChange={e=>setradioval(e.target.value)} id="nonveg" name="options" /> 
              <label for="nonveg" className="radio_label">drop</label>
    
                </div>      
            </div>
            
            <div className="col-sm">
                    <div class="input-group">
                    <input type="text" value={restname} class="form-control search-form" onChange={e => setrestname(e.target.value)} placeholder="Enter Restaurant Name" />
                    <span class="input-group-btn">
                        <button type="submit" class="btn btn-dark search-btn" data-target="#search-form" name="q">
                            search
                    
		                 </button></span>
        
                    </div>
            </div>
            
            
            </form>
            <div className="col-sm input-group">
            
            </div>
            <span class="input-group-btn">
                        <button onClick={()=>setcheckbtn(true)} class="btn btn-dark" data-target="#search-form" name="q">
                            <FaShoppingCart />
                              
		                 </button></span>
                         <Checkout trigger={checkbtn} setTrigger={setcheckbtn}>

                        <Cart />

                         </ Checkout>
        
            </div>
        </div>
    </nav>
        </div>
    )
}

export default Navbar
