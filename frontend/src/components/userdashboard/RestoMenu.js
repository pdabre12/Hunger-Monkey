import React from 'react'
import RestoProfile from './RestoProfile'
import Dishes from './Dishes'
const RestoMenu = (props) => {
    console.log("in the restoprofile",props.location)
    return(

        <div>
        <RestoProfile resto={props.location.resto} />
        <Dishes resto={props.location.resto}/>


        </div>

    )
}

export default RestoMenu
