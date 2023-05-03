import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {get_dishes} from './resto_api/get_resto_dishes'
import {get_orders} from './resto_api/get_resto_orders'
import {update_order} from './resto_api/update_order'
import {update_dish} from './resto_api/update_dish'
import {add_dish} from './resto_api/add_dish'
import cookie from "react-cookies";


export const addDish = createAsyncThunk(
  'resto/add_dish',
    async (data)=>{
        
      const api_response = await add_dish(data)
      return api_response
});
export const updateDish = createAsyncThunk(
  'resto/update_dish ',
    async (data)=>{
        
      const api_response = await update_dish(data)
      return api_response
});


export const getOrders = createAsyncThunk(
  'resto/get_orders',
    async (data)=>{
        
      const api_response = await get_orders(data)
      return api_response
});

export const updateOrder = createAsyncThunk(
  'resto/update_order ',
    async (data)=>{
      console.log("here is your data---------------------->")
      const api_response = await update_order(data)
      console.log("here is the response------------------->")
      return api_response
});


export const getDishes = createAsyncThunk(
  'resto/get_dishes ',
    async (data)=>{
        
      const api_response = await get_dishes(data)
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
          
        
        
        .addCase(addDish.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(addDish.fulfilled, (state, action) => {
            state.status = 'idle';
          
          })
          .addCase(updateDish.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(updateDish.fulfilled, (state, action) => {
            state.status = 'idle';
          
          })
          .addCase(getOrders.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getOrders.fulfilled, (state, action) => {
            state.status = 'idle';
          
          })
          .addCase(updateOrder.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(updateOrder.fulfilled, (state, action) => {
            state.status = 'idle';
          
          })
          .addCase(getDishes.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getDishes.fulfilled, (state, action) => {
            state.status = 'idle';
          
          })
          
          

          
          
          
          
          
         
          
          ;
      }
})
export const {login,logout,signup} = userSlice.actions
export const selectuser = (state) =>state.user
export default userSlice.reducer