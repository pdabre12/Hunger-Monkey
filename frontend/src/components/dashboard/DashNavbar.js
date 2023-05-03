import React from 'react'
import {useState,useEffect} from 'react'
import Checkout from './Checkout'
import Cart from './Cart'
import {FaShoppingCart} from 'react-icons/fa'
const Navbar = (props) => {
    const [checkbtn,setcheckbtn] = useState(false)
    const [radioval,setradioval]=useState("both")
    const [radioval2,setradioval2] = useState("all")
    const [restname,setrestname]=useState("")
    const [restzip,setrestzip]=useState("")
    function filterRestos(e){
        e.preventDefault()
      
        let radio_filtered=[]
        let name_filtered=[]
        let zip_filtered=[]
        let final=[]        
        if(radioval!='both'){
            if(radioval=="pickup"){
            console.log(radioval)
            radio_filtered = props.orestos.filter(resto => resto.delivery_type != "drop")
            final=radio_filtered 
            }
            else{
                console.log(radioval)
                radio_filtered = props.orestos.filter(resto => resto.delivery_type != "pickup")
                final=radio_filtered 
                    
            }
        }
        else{
            radio_filtered=props.orestos
            final=radio_filtered 
        }
        //veg nonveg
        console.log(final)
        console.log("radio val 2222222222222->-------------",radioval2)
        if(radioval2!='all'){
            
            if(radioval2=="veg"){
                console.log(radioval2)
                radio_filtered = final.filter(resto => resto.type_of_dishes !="non-veg")
                final=radio_filtered
            }
            else if(radioval2=="non-veg"){
                console.log(radioval2)
                radio_filtered = final.filter(resto => resto.type_of_dishes !="veg")
                console.log(radio_filtered)
                final=radio_filtered
            } 
        }
        else{
            radio_filtered=final
            final=radio_filtered 
        }

        if(restzip.length!="" & restzip.length==5){
            console.log("in the restzip",restzip)
            zip_filtered = final.filter(resto => resto.city === restzip)
            final=zip_filtered 
        }
        
        if(restname.length!=0){
            console.log("in the restname",restname)
            name_filtered = final.filter(resto => resto.restaurant_name === restname)
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
            <a className="navbar-brand"><img style={{border:0,width:"16rem"}} src="/HungerMonkey.png" /></a>
            
            </div>
            <div className="col-sm">    
            <div class="input-group">
        <input type="text" value={restzip} class="form-control location-form" onChange={e => setrestzip(e.target.value)} placeholder="Enter City" />
        
        </div>
            </div>
            
                
            <div className="col-sm">
                <div className="mainradio" data-toggle="buttons">
        
        <input type="radio" value="all" onChange={e=>setradioval2(e.target.value)} className="radio_button" id="all" name="options2" defaultChecked/>
        <label for="all" className="radio_label">All</label>

       <input type="radio" className="radio_button" value="veg" onChange={e=>setradioval2(e.target.value)} id="veg" name="options2"  />
       <label for="veg" className="radio_label">veg</label>

        <input type="radio" className="radio_button" value="non-veg" onChange={e=>setradioval2(e.target.value)} id="nonveg" name="options2" /> 
        <label for="nonveg" className="radio_label">non-veg</label>

          </div>      


                </div>
            
            <div className="col-sm">    
            <div className="mainradio" data-toggle="buttons">
        
        <input type="radio" value="both" onChange={e=>setradioval(e.target.value)} className="radio_button" id="both" name="options" defaultChecked/>
        <label for="both" className="radio_label">both</label>

       <input type="radio" className="radio_button" value="pickup" onChange={e=>setradioval(e.target.value)} id="pickup" name="options"  />
       <label for="pickup" className="radio_label">pickup</label>

        <input type="radio" className="radio_button" value="drop" onChange={e=>setradioval(e.target.value)} id="drop" name="options" /> 
        <label for="drop" className="radio_label">drop</label>

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
