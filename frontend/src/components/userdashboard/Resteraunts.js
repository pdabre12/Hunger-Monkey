import React, {Component}  from 'react'
import {useEffect,useState,useRef} from 'react'
import axios from 'axios'
import Navbar_Resto from './Navbar_Resto'
import cookie from 'react-cookies'
import { useCookies } from "react-cookie";
import RestoCard from './RestoCard'
import {Redirect} from 'react-router-dom'
const Resteraunts = (props) => {
    let [original_restos,setoriginal_restos]=useState([])
    let [restos_received,setrestos_rcvd]=useState([])
    const [checkbtn,setcheckbtn] = useState(false)
    const [radioval,setradioval]=useState("all")
    const [radioval2,setradioval2]=useState("all")
    const [restname,setrestname]=useState("")
    const [restzip,setrestzip]=useState("")
    const [filters,setfilter]=useState({})
    window.scrollTo(0, 0)
    var final=[]
    function filterRestos(e){
        e.preventDefault();
        let radio_filtered=[]
        let name_filtered=[]
        let zip_filtered=[]
        
        
        console.log("here inside filter",original_restos)
        console.log(radioval)
            
        if(radioval!='all'){
            if(radioval=="pickup"){
            console.log(radioval)
            radio_filtered = original_restos.filter(resto => resto.pickup_drop != "drop")
            final=radio_filtered 
            }
            else{
                console.log(radioval)
                radio_filtered = original_restos.filter(resto => resto.pickup_drop != "pickup")
                final=radio_filtered 
                    
            }
        }
        else{
            radio_filtered=original_restos
            final=radio_filtered 
        }
        //veg nonveg
        console.log(final)
        console.log("radio val 2222222222222->-------------",radioval2)
        if(radioval2!='all'){
            
            if(radioval2=="veg"){
                console.log(radioval2)
                radio_filtered = final.filter(resto => resto.diet !="nonveg")
                final=radio_filtered
            }
            else if(radioval2=="nonveg"){
                console.log(radioval2)
                radio_filtered = final.filter(resto => resto.diet !="veg")
                final=radio_filtered
            } 
        }
        else{
            radio_filtered=final
            final=radio_filtered 
        }



        if(restzip.length!=0){
            console.log("in the restzip",restzip)
            zip_filtered = final.filter(resto => resto.city === restzip)
            final=zip_filtered 
        }
        
        console.log("restname is ",restname.length)
        if(restname.length!=0){
            name_filtered = final.filter(resto => resto.resteraunt_name === restname)
            final=name_filtered 
        }
          
         
        console.log("filtered_list by veg/nonveg",radio_filtered)
        console.log("filtered_list by zipcode",zip_filtered)
        console.log("filtered_list by restoname",name_filtered)
        console.log(final)
        console.log("props received2",props)
        setrestos_rcvd(final)

        /*
        if(radioval!='all'){
            
            if(radioval=="pickup"){
            console.log(radioval)
            radio_filtered = original_restos.filter(resto => resto.pickup_drop != "drop")
            final=radio_filtered 
            }
            else{
                console.log(radioval)
                radio_filtered = original_restos.filter(resto => resto.pickup_drop != "pickup")
                final=radio_filtered 
                    
            }
        }
        else{
            radio_filtered=original_restos
            final=radio_filtered 
        }
        //veg nonveg
        if(radioval2!='all'){
            
            if(radioval2=="veg"){
                console.log(radioval2)
                radio_filtered = radio_filtered.filter(resto => resto.diet !="nonveg")
                final=radio_filtered
            }
            if(radioval2=="nonveg"){
                console.log(radioval)
                radio_filtered = radio_filtered.filter(resto => resto.diet !="veg")
                final=radio_filtered
            } 
        }
        else{
            radio_filtered=original_restos
            final=radio_filtered 
        }



        if(restzip.length!=0){
            console.log("in the restzip",restzip)
            zip_filtered = radio_filtered.filter(resto => resto.city === restzip)
            final=zip_filtered 
        }
        
        console.log("restname is ",restname.length)
        if(restname.length!=0){
            name_filtered = zip_filtered.filter(resto => resto.resteraunt_name === restname)
            final=name_filtered 
        }
          
         
        console.log("filtered_list by radio",radio_filtered)
        console.log("filtered_list by zip",zip_filtered)
        console.log("filtered_list by name",name_filtered)
        console.log(final)
        console.log("props received2",props)
        setrestos_rcvd(final)
        */
    }

let redirectVar=null

    
    useEffect(()=>{
    

{
    
    console.log("am I getting called?",props.filters)
    var headers = new Headers(); 
    const data = {
            resteraunt_name:"dasdsadsa"
        }

        var RestosQuery = `{
            restaurants{
                resteraunt_name
                address
                zipcode
                restdp
                contact
                owner_email
                pickup_drop
                diet
                city
                restdesc
              }
        }`
        
        axios.post("http://localhost:4000/graphql/",{
            query:RestosQuery,
            variables:{}
        }).then(response=>{
                console.log("heres my error",response)
                if(response.status === 200)
                {
                    console.log("here is the response-------------->",response)
                    console.log(response.data,typeof response.data)
                    setoriginal_restos(response.data.data.restaurants)
                    setrestos_rcvd(response.data.data.restaurants)
                    props.setToggler(!props.toggler)

                    console.log("got the restaurants",restos_received)
                    
                }
                else if(response.status === 400)
                {
                    console.log("no data found")
                }

        }).catch((err)=>{console.log(err)})        
        /*
        var tok=localStorage.getItem('token')
        axios.defaults.headers.common['authorization'] = tok;
     axios.get(process.env.REACT_APP_BACKEND+"getallResto").then(response=>{
             
             if(response.status === 200)
             {
                 console.log("your response------------>",response.data)
                 setoriginal_restos(response.data)
                setrestos_rcvd(response.data)
                console.log("here it is",response.data[0])
                
                props.setToggler(!props.toggler)

                 
             }
             else if(response.status === 202)
             {
             }

     })
    */
       
    }
    


},[]);

  
if(!cookie.load('cookie')){
    redirectVar = <Redirect to= "/userlogin"/>
}

let details_received= restos_received.map((resto,index) => {
    return(
     
    <RestoCard
    resto={resto}  
    restdp={resto.restdp} 
    resteraunt_name ={resto.resteraunt_name}
    address={resto.address}
    zipcode={resto.zipcode}

    />

    )
})


    return (


            <div>
        
        <form id="search-form" class="form-inline" role="form" onSubmit={filterRestos} style={{marginTop:"100px"}}>
        
            <div className="col-sm">    
            <input type="text" value={restzip} class="form-control location-form" onChange={e => setrestzip(e.target.value)} placeholder="Enter city" />
            </div>
            
                <div className="col-sm">
                <div className="mainradio" data-toggle="buttons">
        
        <input type="radio" value="all" onChange={e=>setradioval2(e.target.value)} className="radio_button" id="all" name="options2" defaultChecked/>
        <label for="all" className="radio_label">All</label>

       <input type="radio" className="radio_button" value="pickup2" onChange={e=>setradioval2(e.target.value)} id="veg" name="options2"  />
       <label for="veg" className="radio_label">veg</label>

        <input type="radio" className="radio_button" value="drop2" onChange={e=>setradioval2(e.target.value)} id="nonveg" name="options2" /> 
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
            
        
        
        
        
        

            <div id="services" className="container">
            
            
   <h2 className="display-4 text-center mt-5 mb-3">Resteraunts</h2>
        
   <div className="row text-center">
      {details_received}
     



    </div>
    


</div>
</div>


    )
}

export default Resteraunts