import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchStoreInfos = createAsyncThunk('storeInfos/fetchStoreInfos',
    async () => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/store/storeInfos`)
        if(!response.ok){
            throw Error('Request failed')
        }
        const json = await response.json()
        return json
    }
)

const initialState ={
    storeInfos:{
        title: "Aymen Store Info",
        description: "We deliver a high quality electronics, shop with us today for hassle-free and affordable computing solutions!",
        phones: ["0667433301" , "0778950365"],
        address: "Algiers, algeria",
        email: "fisheraymen@gmail.com",
        socialMedia: {
            facebook: "facebook.com/niratzouri",
            instagram: "instagram.com/aymen.fisher",
            youtube: "youtube.com",
            twitter:""
        },
        about: "At Aymen Store Info, we are more than just a store, we are your ultimate destination for all things electronics.\nOur mission is simple: to empower you with the latest and most cutting-edge technology that enhances your lifestyle and productivity.\nWe take pride in our commitment to quality, offering only reputable brands and products that are reliable, durable, and performance-driven. Additionally, we strive to maintain competitive pricing to ensure you get the best value for your investment.\nBeyond products, we aim to create a seamless and enjoyable shopping experience. Our online platform is designed to be user-friendly, making it easy for you to browse, compare, and make informed decisions. And when you step into our physical store, you will experience a welcoming environment where you can explore and test our products firsthand."
        ,
        mapsLocation: 'https://www.google.com/maps/place/Algiers/@36.7434437,3.1410169'
    },
    isLoading:true,
    hasError:false
}

const storeInfos = createSlice({
    name: 'storeInfos',
    initialState,
    extraReducers:(builder) =>{
        builder
            .addCase(fetchStoreInfos.pending,(state) =>{
                state.isLoading=true
                state.hasError=false
            })
            .addCase(fetchStoreInfos.fulfilled,(state,action) =>{
                state.hasError=false
                state.storeInfos=action.payload
                state.isLoading=false
            })
            .addCase(fetchStoreInfos.rejected,(state) =>{
                state.isLoading=false
                state.hasError=true
            })
    }
})

export const selectStoreInfos = state => state.storeInfos.storeInfos
export const selectIsLoadingStoreInfos = state => state.storeInfos.isLoading

export default storeInfos.reducer