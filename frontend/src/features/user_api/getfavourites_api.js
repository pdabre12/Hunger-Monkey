import axios from "axios";

export function getfavs(data){
    var tok=localStorage.getItem('token')
        axios.defaults.headers.common['authorization'] = tok;
    console.log("sending this data-------------->",data)
    return axios.post(process.env.REACT_APP_BACKEND+"getfavourites",data,function(err,resu){
        if(err){
            console.log("error in axios",err)
        }
    })
 
    .then((response)=>{
    
    if(response.status === 200)
    {
        console.log("got your data----------------->")
        console.log(response.data,typeof response.data)
        return response.data
        
    }
    else if(response.status === 202)
    {
        console.log("no data found")
        return null
    }

})
}