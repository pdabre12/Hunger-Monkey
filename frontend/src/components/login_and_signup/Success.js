import React from 'react'
import {useDispatch} from 'react-redux'
import {logout} from '../../features/user_slice'

const Success = (props) => {
    const dispatch = useDispatch()
    function handleLogout(e){
        e.preventDefault();
        dispatch(logout());


    };

    return (
        <div>
            <h1>{props.userdetails}</h1>
            <button type="submit" className="btn btn-black" onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Success
