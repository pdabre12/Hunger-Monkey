import axios from "axios";

export function checkout(data){
    var tok=localStorage.getItem('token')
        axios.defaults.headers.common['authorization'] = tok;
    return  axios.post(process.env.REACT_APP_BACKEND+"placeOrder",data).then(response=>{
             
        if(response.status === 200)
        {
            return true
           
       
            
        }
        else if(response.status === 202)
        {
           return false
        }
        
})
}