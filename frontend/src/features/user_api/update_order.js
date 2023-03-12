import axios from "axios";

export function update_order(data){


    console.log("you have reached the update order section------------------------------->")
    var tok=localStorage.getItem('token')
        axios.defaults.headers.common['authorization'] = tok;
    return  axios.post(process.env.REACT_APP_BACKEND+'updateOrder',data)
    .then(response => {
        if(response.status === 200){
            console.log("updated")
           // props.setupdated(true)
           return true
            }else if(response.status === 202){
            console.log("--------------------------faced an issue------------")
            return false


            
        }
    });
}