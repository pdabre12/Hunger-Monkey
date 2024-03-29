import React, {Component}  from 'react'
import {useEffect,useState} from 'react'
import axios from 'axios'
import { useCookies } from "react-cookie";
import {Redirect} from 'react-router';
import {getOrders} from '../../features/resto_slice'

import NewOrderCard from './NewOrderCard'
import {useSelector,useDispatch} from 'react-redux'
import Pagination from './Pagination'
import {get_resto_orders} from '../queries'

const Current_Orders = (props) => {

    let redirectVar = null
    let [orders_received,setorders]=useState([])
    const [final_orders,setFinalOrders] = useState([])
    const [cookies, setCookie] = useCookies(["restaurant"]);
   
    const [updated,setupdated]=useState(false)
    const [radioval2,setradioval2]=useState("all")
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage,setpostPerPage] = useState(5);
    
    const dispatch=useDispatch()
    useEffect(()=>{
      
        
           axios.get(process.env.REACT_APP_BACKEND+`orders/all-orders/restaurants/${localStorage.getItem('resto')}`)
           .then(response=>{

            console.log("here are your orders",response.data.orders)
            setorders(response.data.orders)
            setFinalOrders(response.data.orders)

        })


           /*
           axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
axios.post(process.env.REACT_APP_BACKEND+"getRestoOrders",data).then(response=>{
                
        if(response.status === 200)
        {
          console.log("here is the response------------->",response)
          setorders(response.data)
       
            
        }
        else if(response.status === 202)
        {
            
        }

})
  
async function getorders(data) {
  let myorders = await dispatch(getOrders(data))
  console.log("here are your dishes-------------->")
  setorders(myorders.payload)
  
}
getorders(data)
*/
    



},[updated]);
console.log("here is the update-------->",updated)
function getOrdersByType(ordertype){

    
//     var headers = new Headers(); 
//     const data = {
//       resteraunt_name:cookies.resteraunt_name,
//   resteraunt_zipcode:cookies.zipcode,
//   status:ordertype

//  }

//  axios.post("http://localhost:8000/orders/",{
//             query:get_resto_orders,
//             variables:data


//         }).then(response=>{

//             console.log("here are your orders",response)
//             setorders(response.data.data.get_resto_orders)

//         })
let filtered_orders = []
 if (ordertype==='new'){
  filtered_orders = final_orders.filter(order=>order.status==='Placed')
  console.log('x',filtered_orders)
  setorders(filtered_orders)
 }
 else if(ordertype==='ongoing'){
 filtered_orders = final_orders.filter(order=>order.status==='Pickup ready' || order.status==='Preparing')
  console.log(filtered_orders)
  setorders(filtered_orders)
 }
 else if(ordertype==='past') {
  filtered_orders = final_orders.filter(order=>order.status==='Cancelled' || order.status === "Delivered" || order.status==="Refunded" ||order.status ==='Refund')
  console.log(filtered_orders)
  setorders(filtered_orders)
 }
 else{
  setorders(final_orders)
 }

//  setorders(filtered_orders)
//  if(radioval!='all'){
//   if(radioval=="pickup"){
//   console.log(radioval)
//   radio_filtered = original_restos.filter(resto => resto.pickup_drop != "drop")
//   final=radio_filtered 
//   }
//   else{
//       console.log(radioval)
//       radio_filtered = original_restos.filter(resto => resto.pickup_drop != "pickup")
//       final=radio_filtered 
          
//   }
// }
// else{
//   radio_filtered=original_restos
//   final=radio_filtered 
// }
/*
 async function getorders(data) {
  let myorders = await dispatch(getOrders(data))
  console.log("here are your dishes-------------->")
  setorders(myorders.payload)
  
}
getorders(data)
*/

/* 
axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
axios.post(process.env.REACT_APP_BACKEND+"getRestoOrders",data).then(response=>{
                
        if(response.status === 200)
        {
          console.log("here is the response------------->",response)
          setorders(response.data)
          
            
        }
        else if(response.status === 202)
        {
            
        }

})

*/
}



  if(localStorage.getItem("resto")==null){
    redirectVar = <Redirect to= "/restologin"/>
}


const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const paginate = pageNumber => setCurrentPage(pageNumber);
let details_received= orders_received.slice(indexOfFirstPost, indexOfLastPost).map((order,index) => {
    return(
     
    <NewOrderCard
    
   order={order}
   isupdated={setupdated}
   updated={updated}   
    />

    )
})


    return (


        
            <div id="services" className="container">
            {redirectVar}
           
            
   <h2 className="display-4 text-center mt-5 mb-3">My Orders</h2>
   <b>Filter by Order type</b>&nbsp;
   <div className="mainradio " data-toggle="buttons">
    
    <input type="radio" value="all" onChange={e=>{setradioval2(e.target.value);getOrdersByType("all")}} className="radio_button" id="all" name="options2" defaultChecked/>
    <label for="all" className="radio_label">All</label>

   <input type="radio" className="radio_button" value="new" onChange={e=>{setradioval2(e.target.value);getOrdersByType("new")}} id="new" name="options2"  />
   <label for="new" className="radio_label"> New</label>


   <input type="radio" className="radio_button" value="ongoing" onChange={e=>{setradioval2(e.target.value);getOrdersByType("ongoing")}} id="ongoing" name="options2"  />
   <label for="ongoing" className="radio_label"> ongoing</label>

    <input type="radio" className="radio_button" value="past" onChange={e=>{setradioval2(e.target.value);getOrdersByType("past")}} id="past" name="options2" /> 
    <label for="past" className="radio_label">Past</label>

      </div> 
      <div className="col-sm">
      <b>Orders per page</b>&nbsp;
                <div className="mainradio" data-toggle="buttons">
        
                    <input type="radio" onChange={e=>setpostPerPage(2)} className="radio_button" id="two" name="pageorders" />
                    <label for="two" className="radio_label">2</label>

                    <input type="radio" className="radio_button" onChange={e=>setpostPerPage(5)} id="five" name="pageorders" defaultChecked />
                    <label for="five" className="radio_label">5</label>

                    <input type="radio" className="radio_button"  onChange={e=>setpostPerPage(10)} id="ten" name="pageorders" /> 
                    <label for="ten" className="radio_label">10</label>

          </div>      
        </div>

      <hr />
   <div className="row text-center">
      {details_received}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={orders_received.length}
        paginate={paginate}
      />




    </div>
    


</div>
    )
    
    
}

export default Current_Orders
