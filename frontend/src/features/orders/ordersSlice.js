import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllOrders = createAsyncThunk('orders/fetchAllOrders',
    async () => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/orders`,{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        if(!response.ok){
            if(response.status == 401){
                location.replace('/admin/login')
                return
            }
            throw Error('Request failed')
        }
        const orders = await response.json()
        return orders
    }
)

export const completeOrder = createAsyncThunk('orders/setCompleted',
    async (_id) => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/orders/${_id}`, {
            method: 'PATCH',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        if(!response.ok){
            if(response.status == 401){
                location.replace('/admin/login')
                return
            }
            throw Error('Request failed')
        }
        const json = await response.json()
        return json
    }
)

export const deleteOrder = createAsyncThunk('orders/delete',
    async (_id) => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/orders/${_id}`, {
            method: 'DELETE',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        if(!response.ok){
            if(response.status == 401){
                location.replace('/admin/login')
                return
            }
            throw Error('Request failed')
        }
        const json = await response.json()
        return json
    }
)

const initialState = {
    orders: [],
    isLoadingCompleteOrder: true,
    hasErrorCompleteOrder: false,
    isLoadingFetchOrders: true,
    hasErrorFetchOrders: false,
    isLoadingDeleteOrder: true,
    hasErrorDeleteOrder: false
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    extraReducers: (builder) => {
        //fetch orders
        builder.addCase(fetchAllOrders.pending, (state, action) => {
            state.isLoadingFetchOrders = true
            state.hasErrorFetchOrders = false
        })
        builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
            state.hasErrorFetchOrders = false
            state.orders = action.payload
            state.isLoadingFetchOrders = false
        })
        builder.addCase(fetchAllOrders.rejected, (state, action) => {
            state.isLoadingFetchOrders = false
            state.hasErrorFetchOrders = true
        })
        //set orders completed
        builder.addCase(completeOrder.pending, (state, action) => {
            state.isLoadingCompleteOrder = true
            state.hasErrorCompleteOrder = false
        })
        builder.addCase(completeOrder.fulfilled, (state, action) => {
            state.hasErrorCompleteOrder = false
            // find elemnt then update his status and completion date
            const orderIndex = state.orders.findIndex(element => element._id == action.payload._id)
            state.orders[orderIndex].isCompleted = true
            state.orders[orderIndex].updatedAt = action.payload.updatedAt
            // error state
            state.isLoadingCompleteOrder = false
        })
        builder.addCase(completeOrder.rejected, (state, action) => {
            state.hasErrorCompleteOrder = true
            state.isLoadingCompleteOrder = false
        })
        // Delete Order
        builder.addCase(deleteOrder.pending, (state, action) => {
            state.isLoadingDeleteOrder = true
            state.hasErrorDeleteOrder = false
        })
        builder.addCase(deleteOrder.fulfilled, (state, action) => {
            state.hasErrorDeleteOrder = false
            // find elemnt then update his status and completion date
            state.orders = state.orders.filter(order => order._id != action.payload.deletedId)
            // error state
            state.isLoadingDeleteOrder = false
        })
        builder.addCase(deleteOrder.rejected, (state, action) => {
            state.hasErrorDeleteOrder = true
            state.isLoadingDeleteOrder = false
        })
    }
})

//selectors

export const selectAllOrders = state => state.orders.orders
export const selectIsLoadingOrders = state => state.orders.isLoadingFetchOrders
export const selectHasErrorOrders = state => state.orders.hasErrorFetchOrders

export const selectIsLoadingCompleteOrder = state => state.orders.isLoadingCompleteOrder
export const selectHasErrorCompleteOrder = state => state.orders.hasErrorCompleteOrder

export const selectIsLoadingDeleteOrder = state => state.orders.isLoadingDeleteOrder
export const selectHasErrorDeleteOrder = state => state.orders.hasErrorDeleteOrder

export default ordersSlice.reducer