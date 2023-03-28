import React from 'react'
import Jumbo from './Jumbo'
import DashNavbar from './DashNavbar'
import Resteraunts from './Resteraunts'
import {useQuery} from 'graphql-hooks'
import{useState,useEffect} from 'react'
import {useCart} from 'react-use-cart'
import {BrowserRouter, Route , Switch} from 'react-router-dom'
import Footer from './Footer'

const Dashboard = () => {
    const {emptyCart} = useCart()

    useEffect(()=>{
        emptyCart();

    },[]);
    return (
        
<html lang="en">
   <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>UberEats</title>
        
      
      <style>
      
      </style>
   </head>
   
   <body >
   
      <div id="root">
       
       
            <Resteraunts />
      </div>
      </body>
      <Footer />

</html>







    )
}

export default Dashboard
