import React, {Component}  from 'react'
import {useEffect,useState} from 'react'
import axios from 'axios'
import { useCookies } from "react-cookie";
import cookie from 'react-cookies'
import {Link} from 'react-router-dom'
import {getDishes} from '../../features/resto_slice'
import {useSelector,useDispatch} from 'react-redux'
import {get_dishes} from '../queries'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Resteraunts = () => {
    
    let [menus_recieved,setMenus]=useState([])
    const [cookies, setCookie] = useCookies(["restaurant"]);
    const dispatch=useDispatch() 
    const [menusPresent,setMenusPresent] = useState(false);
    const [updated,setupdated]=useState(false)
    function handleDelete(e){
        e.preventDefault();
        axios.delete(`http://localhost:8000/menus/${e.currentTarget.value}`)
        .then(res=>{
            console.log(res.data)
            if(res.status===200){
                window.alert("Menu item deleted succesfully..")
            }
            else{
                window.alert("Could not delete menu item! Please try again..")
            }
            window.location.reload();
        })
    }
    
    window.scrollTo(0, 0)
           
    useEffect(()=>{
        console.log("herhehrehrhehrehrehh")
             var headers = new Headers(); 
           
            axios.get(`http://localhost:8000/menus/all-menus/${localStorage.getItem('resto')}`)
            .then(response=>{

            console.log("here are your dishes",response)
            setMenus(response.data.menus)
            setMenusPresent(!menusPresent)

        })
        .catch(err=>{
            console.log(err)

        })


        
            
   
        /*
        async function getdishes(data) {
            let mydishes = await dispatch(getDishes(data))
            console.log("here are your dishes-------------->")
            setdishes(mydishes.payload)
            
          }
          getdishes(data)
          */




    


  /*
        axios.post(process.env.REACT_APP_BACKEND+"getDishes",data).then(response=>{
                console.log("repsonse is--------->",response.data)
                if(response.status === 200)
                {
                    
                    console.log(response.data,typeof response.data)
                    setdishes(response.data)
                    console.log("gsdfsdfds=================",dishes_received)
                    
                    
                }
                else if(response.status === 400)
                {
                }

        })*/
       
    },[]);

if(menus_recieved.length>0){
    var details_received= menus_recieved.map(menu => {
    return(
        <><link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" /><div className="col-md-4 mb-4">
            <div className="card h-100" id={menu.menu_id}>
                <img className="card-img-top" style={{
                    width: "100%",
                    height: "15vw",
                    objectFit: "cover"
                }} src={menu.menu_dp} alt="Design" />
                <div className="card-body">
                    <h4 className="card-title">{menu.dish_name}</h4>
                    <p className="card-text">{menu.description}</p>
                    <p className="card-text">{menu.cuisine}</p>
                    <p className="card-text"><b style={{ color: "black" }}>{menu.price}$</b></p>
                </div>
                <div className="card-footer py-4" style={{backgroundColor:"#F4F0F0"}}>

                    <Link to={{ pathname: "/restodash/updateDish", state: { resto: menu } }}><button style={{marginLeft:"2rem"}} type="button" class="btn btn-dark">Update</button></Link>
                    
                    <button onClick={handleDelete} value={menu.menu_id} style={{border:"0px solid black",marginTop:"0.9%",float:"right",backgroundColor:"#F4F0F0"}}>
                    <FontAwesomeIcon icon={faTrash} style={{float:"right",marginLeft:"1.8rem",marginTop:"0",fontSize:"1.8rem"}} /> 
                    </button>
                    
                         </div>
                         
            </div>
        </div></>

    )
})
}


    return (

        
            <div id="services" className="container">
            
   <h2 className="display-4 text-center mt-5 mb-4">Menus</h2>
 
   <div className="row text-center">
      {details_received?details_received:<h5>No existing menu items to display. Please add some menu items.</h5>}
     



    </div>
    


</div>
    )
}


export default Resteraunts
