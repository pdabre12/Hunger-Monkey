import React from 'react'
import './vegnonveg.css'
const Deliverytype = () => {
    return (
        <div>
            <div className="mainradio" data-toggle="buttons">
        
            <input type="radio" className="radio_button" id="all" name="options"/>
            <label for="all" className="radio_label">Pickup</label>
        
            <input type="radio" className="radio_button" id="veg" name="options" defaultChecked />
            <label for="veg" className="radio_label">Delivery</label>
        
            <input type="radio" className="radio_button" id="veg" name="options" defaultChecked />
            <label for="veg" className="radio_label">Both</label>
            
        
    </div>

    
        </div>
    )
}

export default Deliverytype
