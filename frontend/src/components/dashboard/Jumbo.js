import React from 'react'
import {Link ,useHistory} from 'react-router-dom';
const Jumbo = () => {
    const history = useHistory();
    

    function handleLogin(){
        history.push('/login');
}

    return (
        <div style={{paddingBottom:"0px"}}>
            <header className="jumbotron jumbotron-fluid  landing" >
                <div className="container-fluid text-left"> 
                <h1 className="display-3" style={{color:"white"}}>Want food? Get food.</h1>
                <form onSubmit={{handleLogin}}>
                    <p className="display-4" style={{color:"white"}}>Food Anytime, Anywhere and for Anyone</p>
                    <p><Link to="/userlogin"><button type = "submmit" className="btn btn-dark btn-lg" >Login/Register</button></Link></p>
                </form>
                </div>
                
            </header>

        </div>
    )
}

export default Jumbo
