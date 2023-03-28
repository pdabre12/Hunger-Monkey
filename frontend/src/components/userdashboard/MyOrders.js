import React, {Component}  from 'react'
import {useEffect,useState} from 'react'
import axios from 'axios'
import { useCookies } from "react-cookie";
import {Redirect} from 'react-router';
import {selectuser} from '../../features/user_slice'
import {useSelector,useDispatch} from 'react-redux'
import CurrentOrderCard from './CurrentOrderCard'
import Pagination from './Pagination'
import {get_cust_orders} from '../queries'

const Current_Orders = (props) => {
    const user = useSelector(selectuser)
    let redirectVar = null
    let [orders_received,setorders]=useState([])
    const [cookies, setCookie] = useCookies(["customer"]);
    console.log(user)
    const [updated,setupdated]=useState(false)
    const [radioval2,setradioval2]=useState("all")

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage,setpostPerPage] = useState(5);
    const dispatch=useDispatch()
    useEffect(()=>{
        
             var headers = new Headers(); 
             const data = {
                 email:localStorage.getItem('token'),
                 order_type:"all",
             }

             axios.post("http://localhost:4000/graphql/",{
            query:get_cust_orders,
            variables:data


        }).then(response=>{

            console.log("here are your orders",response)
            setorders(response.data.data.get_cust_orders)

        })

//              var tok=localStorage.getItem('token')
//         axios.defaults.headers.common['authorization'] = tok;
//     axios.post(process.env.REACT_APP_BACKEND+"getCustOrders",data).then(response=>{
       
//         if(response.status === 200)
//         {
            
//            setorders(response.data)
            
//         }
//         else if(response.status === 202)
//         {
//             console.log("no data found")
//         }
// })
    



},[updated]);
console.log("here is the update-------->",updated)
  function getOrdersByType(ordertype){
    var headers = new Headers(); 
    const data = {
        email:user.user.email,
        order_type:ordertype,
        user_type:"customer"
    }
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
 axios.post(process.env.REACT_APP_BACKEND+"getCustOrders",data).then(response=>{
       
       if(response.status === 200)
       {
           
           console.log("received response here",response.data)
           setorders(response.data)
           
       }
       else if(response.status === 202)
       {
           console.log("no data found")
       }

})
  }

  if(localStorage.getItem("token")==null){
    console.log("loaded successfully")
    redirectVar = <Redirect to= "/userlogin"/>
}

console.log(orders_received.length)
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const paginate = pageNumber => setCurrentPage(pageNumber);
let details_received= orders_received.slice(indexOfFirstPost, indexOfLastPost).map((order,index) => {
    
    return(
     
    <CurrentOrderCard
    
   order={order}
   setupdated={setupdated}
    
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

                    <input type="radio" className="radio_button" onChange={e=>setpostPerPage(5)} id="five" name="pageorders"  defaultChecked/>
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
