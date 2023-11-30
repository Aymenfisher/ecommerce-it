import { createSlice } from "@reduxjs/toolkit";

const categories = createSlice({
    name: 'categories',
    initialState: ['laptops', 'phones', 'printers', 'desktops', 'accessories']
})

export const selectCategories = state => state.categories

export default categories.reducer