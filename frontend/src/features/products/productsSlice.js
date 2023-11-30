import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

export const fetchStoreProducts = createAsyncThunk('products/fetchStoreProducts', async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/store/products`,{mode:'cors'})
    if (!response.ok) {
        throw Error('Request failed')
    }
    const json = await response.json()
    return json
})
export const fetchAdminProducts = createAsyncThunk('products/fetchAdminProducts', async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/products`, {
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    if (!response.ok) {
        if(response.status == 401){
            location.replace('/admin/login')
            return
        }
        throw Error('Request failed')
    }
    const json = await response.json()
    return json
})

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (_id) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/products/${_id}`, {
        method: 'DELETE',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    if (!response.ok) {
        if(response.status == 401){
            location.replace('/admin/login')
            return
        }
        throw Error('Request failed')
    }
    const { deletedId } = await response.json()

    return deletedId
})

const products = createSlice({
    name: 'products',
    initialState: {
        products: [],
        isLoadingStoreProducts: true,
        hasErrorStoreProducts: false,
        isLoadingAdminProducts: true,
        hasErrorAdminProducts: false,
        isLoadingDeleteProduct: true,
        hasErrorDeleteProduct: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStoreProducts.pending, (state) => {
                state.isLoadingStoreProducts = true
                state.hasErrorStoreProducts = false
            })
            .addCase(fetchStoreProducts.fulfilled, (state, action) => {
                state.hasErrorStoreProducts = false
                state.products = action.payload
                state.isLoadingStoreProducts = false
            })
            .addCase(fetchStoreProducts.rejected, (state) => {
                state.hasErrorStoreProducts = true
                state.isLoadingStoreProducts = false
            })
        builder
            .addCase(fetchAdminProducts.pending, (state) => {
                state.isLoadingAdminProducts = true
                state.hasErrorAdminProducts = false
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.hasErrorAdminProducts = false
                state.products = action.payload
                state.isLoadingAdminProducts = false
            })
            .addCase(fetchAdminProducts.rejected, (state) => {
                state.hasErrorAdminProducts = true
                state.isLoadingAdminProducts = false
            })
        //handlind deleting product
        builder
            .addCase(deleteProduct.pending, (state) => {
                state.isLoadingDeleteProduct = true
                state.hasErrorDeleteProduct = false
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.hasErrorDeleteProduct = false
                state.products = state.products.filter(product => product._id != action.payload)
                state.isLoadingDeleteProduct = false
            })
            .addCase(deleteProduct.rejected, (state) => {
                state.hasErrorDeleteProduct = true
                state.isLoadingDeleteProduct = false
            })
    }
})


//selectors
export const selectProducts = (state) => state.products.products

export const selectProductById = (state, id) => {
    return state.products.products.find(product => product._id == id)
}
export const selectNewProducts = createSelector(
    state => state.products.products,
    products => products.filter(product => product.isNewProduct)
)
export const selectTopProducts = createSelector(
    state => state.products.products,
    products => products.filter(product => product.isTopProduct)
)

export const selectIsLoadingStoreProducts = state => state.products.isLoadingStoreProducts
export const selectHasErrorStoreProducts = state => state.products.hasErrorStoreProducts

export const selectIsLoadingAdminProducts = state => state.products.isLoadingAdminProducts
export const selectHasErrorAdminProducts = state => state.products.hasErrorAdminProducts

export const selectIsLoadingDeleteProduct = state => state.products.isLoadingDeleteProduct
export const selectHasErrorDeleteProduct = state => state.products.hasErrorDeleteProduct


//reducer
export default products.reducer