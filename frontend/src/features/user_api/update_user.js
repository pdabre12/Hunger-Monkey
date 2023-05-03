import axios from "axios";

export function update_user(data){
    var tok=localStorage.getItem('token')
        axios.defaults.headers.common['authorization'] = tok;
    return  axios.post(process.env.REACT_APP_BACKEND+'updateCust',data,(err,response) => {
        if(response.status === 200){
            console.log("updated")
           // props.setupdated(true)
           return true
            }else if(response.status === 202){
            
            return false


            
        }
    });
}