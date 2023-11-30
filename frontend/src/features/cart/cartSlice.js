import { createSlice } from "@reduxjs/toolkit";

const initialState = {}
const cart = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem: (state,action) =>{
            state[action.payload.item._id]={
                product:action.payload.item,
                quantity:action.payload.quantity
            }
        },
        removeItem: (state,action) =>{
            delete state[action.payload]
        },
        clearCart:(state,action) =>{
            return initialState
        },
        updateItemQuantity: (state,action) =>{
            state[action.payload._id].quantity=  action.payload.quantity
        }
    }
})

export const selectCart = state => state.cart
export const {addItem,removeItem,updateItemQuantity,clearCart} = cart.actions

export default cart.reducer