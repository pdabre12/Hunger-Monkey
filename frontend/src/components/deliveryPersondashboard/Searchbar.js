import React from 'react'

const Searchbar = () => {
    return (
        <div>
            
    <div class="input-group">
        <input type="text" class="form-control search-form" placeholder="Enter Dish Name" />
        <span class="input-group-btn"><button type="submit" class="btn btn-dark search-btn" data-target="#search-form" name="q">
        search
        
		</button></span>
        
        </div>

        </div>
    )
}

export default Searchbar
