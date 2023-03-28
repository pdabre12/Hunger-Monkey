import React from 'react'
import Navbar from './Navbar'
const MainLayout = (props) => {
    return (
        <div>
            <Navbar />
            {props.children}
        </div>

    )
}

export default MainLayout
