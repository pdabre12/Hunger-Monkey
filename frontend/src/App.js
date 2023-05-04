import './App.css';

import './login_page.css'
import Main from './components/Main'
import {BrowserRouter} from 'react-router-dom'

import { CookiesProvider } from "react-cookie";
import { CartProvider } from "react-use-cart";



function App(props) {
  
  return (
    
    <CookiesProvider>
        <BrowserRouter>
        <CartProvider>
        
            <Main client={props.client}/>
          
        
        </CartProvider>
        </BrowserRouter>
    </CookiesProvider>
   
  );
}

export default App;
