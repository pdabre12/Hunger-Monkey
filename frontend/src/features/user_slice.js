import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {getfavs} from './user_api/getfavourites_api'
import {checkout} from './user_api/checkout'
import {get_all_resto} from './user_api/get_all_resto'
import {get_cust_orders} from './user_api/get_cust_orders'
import {get_dishes} from './user_api/get_dishes'
import {update_order} from './user_api/update_order'
import {update_user} from './user_api/update_user'

import cookie from "react-cookies";



export const getfavourites = createAsyncThunk(
    'user/getfavourites',
      async (data)=>{
          
        const api_response = await getfavs(data)
       
        return api_response
});

export const placeOrder = createAsyncThunk(
  'user/checkout ',
    async (data)=>{
      console.log(data)
        
      const api_response = await checkout(data)
      return api_response
});

export const getrestos = createAsyncThunk(
  'user/get_all_resto ',
    async (data)=>{
        
      const api_response = await get_all_resto(data)
      return api_response
});
export const getCustOrders = createAsyncThunk(
  'user/get_cust_orders ',
    async (data)=>{
        
      const api_response = await get_cust_orders(data)
      return api_response
});
export const getDishes = createAsyncThunk(
  'user/get_dishes ',
    async (data)=>{
        
      const api_response = await get_dishes(data)
      return api_response
});
export const updateOrder = createAsyncThunk(
  'user/update_order ',
    async (data)=>{
      console.log("here is your data---------------------->")
      const api_response = await update_order(data)
      console.log("here is the response------------------->")
      return api_response
});


export const updateUser = createAsyncThunk(
  'user/update_user ',
    async (data)=>{
        
      const api_response = await update_user(data)
      return api_response
});


var initial={
  user:null,
  userType:null,
  status:null,
  isloggedin:false,
  favourites:[]
}
export const userSlice=createSlice({
    name:"user",
    initialState:initial,
    reducers:{
        login:(state,action)=>{
            console.log("in redux---------------------------")
            state.user={"email":action.payload.email,"userType":action.payload.userType}
            
            
            
           
        },
        signup:(state,action)=>{
            state.user={"email":action.payload.email,"userType":action.payload.userType}
        

           
        },
        logout:(state,action)=>{
            state.user=initial
            cookie.remove('loggedin', { path: '/' })
        }
    },
    extraReducers: (builder) => {
        builder
          
        
        
        .addCase(getfavourites.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getfavourites.fulfilled, (state, action) => {
            state.status = 'idle';
            state.favourites = action.payload;
          })
          
          
          
          
          .addCase(placeOrder.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(placeOrder.fulfilled, (state, action) => {
            state.status = 'idle';
            
            state.favourites = action.payload;
        
          })
          
          
          
          .addCase(getrestos.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getrestos.fulfilled, (state, action) => {
            state.status = 'idle';
            
          })
          
          
          
          .addCase(getCustOrders.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getCustOrders.fulfilled, (state, action) => {
            state.status = 'idle';
           })




           .addCase(getDishes.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getDishes.fulfilled, (state, action) => {
            state.status = 'idle';
           
          })
          .addCase(updateUser.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(updateUser.fulfilled, (state, action) => {
            state.status = 'idle';
           
          })
          
         
          
          ;
      }
})
export const {login,logout,signup} = userSlice.actions
export const selectuser = (state) =>state.user
export default userSlice.reducer