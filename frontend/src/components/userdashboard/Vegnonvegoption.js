import React from 'react'
import './vegnonveg.css'
const Vegnonvegoption = () => {
    return (
        <div>
            <div className="mainradio" data-toggle="buttons">
        
            <input type="radio" className="radio_button" id="all" name="options"/>
            <label for="all" className="radio_label">All</label>
        
            <input type="radio" className="radio_button" id="veg" name="options" defaultChecked />
            <label for="veg" className="radio_label">Veg</label>
        
            <input type="radio" className="radio_button" id="nonveg" name="options" /> 
            <label for="nonveg" className="radio_label">NonVeg</label>
        
    </div>

    
        </div>
    )
}

export default Vegnonvegoption
