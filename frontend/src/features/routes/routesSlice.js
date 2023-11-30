import { createSlice } from "@reduxjs/toolkit";



const routes = createSlice({
    name:'routes',
    initialState:[ // isNavigation: is this item a navigation bar item
        {name:'Home',path:'/home',isNavigation:true},
        {name:'Products',path:'/products',isNavigation:true},
        {name:'Product',path:'/products/:id',isNavigation:false},
        {name:'About Us',path:'/about',isNavigation:true},
        {name:'Contact Us',path:'/contact',isNavigation:true}
    ]
})

export const selectRoutes = (state) => state.routes

export default routes.reducer