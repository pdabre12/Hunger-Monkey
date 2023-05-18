import React  from 'react'
import {useEffect,useState,useRef} from 'react'
import axios from 'axios'
import Jumbo from './Jumbo'
import DashNavbar from './DashNavbar'
import RestoCard from './RestoCard'
import { Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router'
import Carousel from 'react-multi-carousel'


const Resteraunts = (props) => {

  
    const [original_restos,setoriginal_restos]=useState([])
    let [restos_received,setrestos]=useState([])
    const [updated,setUpdated] = useState(false);
    const [distanceMatrix,setDistanceMatrix] = useState([])
    const [currentAddress,setCurrentAddress] = useState("")
    const history = useHistory();
    var updated_restos = [];



    function filter_restos(){

    }
    

    function calculateDistance(destinationString){
        const apiUrl = process.env.REACT_APP_BACKEND+ 'distance/';
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
    console.log("data",data.rows[0].elements[0].duration_in_traffic)
    
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
    setrestos(updated_restos)
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


    useEffect(()=>{
        
        if(Object.keys(props).length == 0){
        if(localStorage.getItem("user")!=null){
          history.push("/userdash");
        }
        if(localStorage.getItem("deliveryPerson")!=null){
          history.push("/deliveryPersondash");
        }
        if(localStorage.getItem("restaurant")!=null){
          history.push("/restodash");
        }
        axios.get("http://localhost:8000/"+"restaurants/").then(response=>{
                console.log("heres my error",response)
                if(response.status === 200)
                {
                    setoriginal_restos(response.data.restaurants)
                    setrestos(response.data.restaurants)
                    setUpdated(true)
                    if(restos_received.length>0){

                        var destinationString = generateDestinationString();
                        calculateDistance(destinationString)
                    }

                    
                }
                else if(response.status === 400)
                {
                    console.log("no data found")
                }

        }).catch((err)=>{console.log(err)})

     
       
    }
    else{
        console.log("got some props");
    }



},[updated]);

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

  
let details_received= restos_received.map((resto,index) => {
    return(
     
    <RestoCard
    resto={resto}  
    restdp={resto.restaurant_dp} 
    resteraunt_name ={resto.restaurant_name}
    address={resto.street}
    zipcode={resto.pincode}
    time={resto.duration_in_traffic}

    />

    )
})


    return (


            <>
              
                 <div className="landing">
            <DashNavbar filter={filter_restos} orestos={original_restos} setrestos={setrestos} />
            <Jumbo />
            

            
            
        </div>
        {currentAddress?(
<>

    <div id="services" className="container">
            Showing restaurants near: <span></span><span></span><span></span>
            <b>{currentAddress}</b>


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
</>
   ) }

export default Resteraunts;
