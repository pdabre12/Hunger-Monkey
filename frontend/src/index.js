import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {Provider} from "react-redux"
import {store,persist_store} from './app/store'
import './components/userdashboard/user.css'
import './components/userdashboard/side.css'
import {PersistGate} from 'redux-persist/integration/react'
import {ApolloProvider,withApollo} from 'react-apollo'
import ApolloClient from 'apollo-boost'
import '../node_modules/font-awesome/css/font-awesome.min.css'; 


const client= new ApolloClient({
    uri:"http://localhost:4000/graphql/"
  })
  
const AppWithClient = withApollo(App);
ReactDOM.render(
    <Provider store={store}>
    <PersistGate persistor={persist_store}>
    <ApolloProvider client={client}>
        <AppWithClient>
    <App />
    </AppWithClient>
  </ApolloProvider>  
    </PersistGate>
    </Provider>
    ,document.getElementById('root')

    
    
);


reportWebVitals();
