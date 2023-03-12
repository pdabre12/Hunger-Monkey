import React from 'react'
import {BrowserRouter, Route , Switch} from 'react-router-dom'
import {Resteraunts} from './Resteraunts'
const Contentbar = () => {
    return (
        <BrowserRouter>
        
        <Switch>
        
        <Route exact path='/' component={Resteraunts} />
        <Route path = '/restoinfo' component = {RestoInfo} />
        </Switch>
        </BrowserRouter>
  
)
}

export default Contentbar
