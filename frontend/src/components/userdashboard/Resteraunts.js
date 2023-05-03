import React, {Component}  from 'react'
import {useEffect,useState,useRef} from 'react'
import axios from 'axios'
import Navbar_Resto from './Navbar_Resto'
import cookie from 'react-cookies'
import { useCookies } from "react-cookie";
import RestoCard from './RestoCard'
import {Redirect} from 'react-router-dom'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Spinner } from 'react-bootstrap'


const Resteraunts = (props) => {
    let [original_restos,setoriginal_restos]=useState([])
    let [restos_received,setrestos_rcvd]=useState([])
    const [radioval,setradioval]=useState("all")
    const [radioval2,setradioval2]=useState("all")
    const [restname,setrestname]=useState("")
    const [restzip,setrestzip]=useState("")
    const [flag,setFlag] = useState(false);
    const [recommendedRestos,setRecommendedRestos] = useState([])
    const [updated,setUpdated] = useState(false);
    const [distanceMatrix,setDistanceMatrix] = useState([])
    const [currentAddress,setCurrentAddress] = useState("")
    var updated_restos = [];
    let redirectVar = null
  
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
            radio_filtered = original_restos.filter(resto => resto.delivery_type != "drop")
            final=radio_filtered 
            }
            else{
                console.log(radioval)
                radio_filtered = original_restos.filter(resto => resto.delivery_type != "pickup")
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



        if(restzip.length!=0){
            console.log("in the restzip",restzip)
            zip_filtered = final.filter(resto => resto.city === restzip)
            final=zip_filtered 
        }
        
        console.log("restname is ",restname.length)
        if(restname.length!=0){
            name_filtered = final.filter(resto => resto.restaurant_name === restname)
            final=name_filtered 
        }
          
         
        console.log("filtered_list by veg/nonveg",radio_filtered)
        console.log("filtered_list by zipcode",zip_filtered)
        console.log("filtered_list by restoname",name_filtered)
        console.log(final)
        console.log("props received2",props)
        setrestos_rcvd(final)
    }

    function calculateDistance(destinationString){
        const apiUrl = 'http://localhost:8000/distance/';
        var currentLocationString = "" ;
        const myPromise = new Promise((resolve,reject)=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            const geocoder = new window.google.maps.Geocoder();
    
        const latlng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              console.log(results[0].formatted_address)
              currentLocationString =  results[0].formatted_address
              
              resolve(currentLocationString)
            } else {
              console.log('No results found');
              reject("error")
            }
          }
           else {
            console.log('Geocoder failed due to: ' + status);
            reject("error")
          }
        });
        console.log(currentLocationString,destinationString)
            
        })
    
       
    })
    myPromise.then(res=>
        {
          

fetch(`${apiUrl}?origins=${res}&destinations=${destinationString}&departure_time=now`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    
    setDistanceMatrix(data.rows[0].elements)
            restos_received.map((resto,index)=>{
            restos_received[index] = {
                ...resto,
                distance:data.rows[0].elements[index].distance.value,
                duration_in_traffic:Math.round(data.rows[0].elements[index].duration_in_traffic.value/58.5)

                
            }
        })
             
    restos_received.sort((a,b)=>{
        if (a.distance < b.distance) {
            return -1;
          } else if (a.distance > b.distance) {
            return 1;
          } else {
            return 0;
          }
          
    })
    updated_restos = restos_received.filter(resto => resto.distance < 100000)
    setrestos_rcvd(updated_restos)
    setCurrentAddress(res)
})
    .catch(error => console.error(error))


    })
}
        

    function generateDestinationString(){
        var string = ""
        restos_received.map((resto,index)=>{
            if (index>=1){
            string+="|"+resto.street
            }
            else{
                string+=resto.street
            }
        })
        return string
    }



const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 1 // optional,  to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
}
    
    useEffect(()=>{
    

{
    
    console.log("am I getting called?",props.filters)
    var headers = new Headers(); 
   
    
        axios.get("http://localhost:8000/restaurants/").then(response=>{
                if(response.status === 200)
                {
                    console.log("here is the response-------------->",response)
                    console.log(response.data,typeof response.data)
                    setoriginal_restos(response.data.restaurants)
                    setrestos_rcvd(response.data.restaurants)
                    setRecommendedRestos(response.data.restaurants)
                    setFlag(true);
                    if(restos_received.length>0){

                        var destinationString = generateDestinationString();
                        calculateDistance(destinationString)
                    }
                    props.setToggler(!props.toggler)
                    
                    // else{
                    //     console.log(response)
                    // }
                   
                // });
                return response.data.restaurants
            
                
                    
                    
                }
                else if(response.status === 404)
                {
                    console.log("no data found")
                }

        })
       
        .catch((err)=>{console.log(err)})   
    }
    


},[flag]);

  
if(localStorage.getItem("user")!=null){
    redirectVar = <Redirect to= "/userlogin"/>
}
console.log(restos_received)
let details_received = restos_received.map((resto,index) => {
    
    return(
    <RestoCard
    resto={resto}  
    restdp={resto.restaurant_dp} 
    restaurant_name ={resto.restaurant_name}
    restaurant_address={resto.street}
    zipcode={resto.zipcode}
    time={resto.duration_in_traffic}
    
/>
    )
})

let details_recommended_received = recommendedRestos.map((resto,index) => {
    
    return(
    <RestoCard
    resto={resto}  
    restdp={resto.restaurant_dp} 
    restaurant_name ={resto.restaurant_name}
    restaurant_address={resto.street}
    zipcode={resto.zipcode}
    // time={resto.duration_in_traffic}
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
            
        
        
        
        
        

            <div id="services" className="container" style={{marginTop:"5%"}}>

         {currentAddress?(
<>

            <div id="services" className="container">
            Showing restaurants near: <span></span><span></span><span></span>
            <b>{currentAddress}</b>
<br></br>

<br></br>   
            
   <h2 className="display-4 mt-5 mb-3">Recommended Restaurants</h2>
    

        
      
 <Carousel 
  swipeable={false}
  draggable={false}
  showDots={true}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={true}
//   autoPlay={this.props.deviceType !== "mobile" ? true : false}
  autoPlaySpeed={1000}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={500}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile"]}
//   deviceType={this.props.deviceType}
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-40-px"
>
        {details_recommended_received}
   
        
  

</Carousel>


<h2 className="display-4 mt-5 mb-3">Restaurants</h2>
        
   <Carousel 
  swipeable={false}
  draggable={false}
  showDots={true}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={true}
//   autoPlay={this.props.deviceType !== "mobile" ? true : false}
  autoPlaySpeed={1000}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={500}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile"]}
//   deviceType={this.props.deviceType}
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-40-px"
>
        {details_received}
        
  
 </Carousel> 

</div>
</>

) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Spinner animation="border" variant="success" />
    </div>
  )}

</div>
</div>

    )
}

export default Resteraunts