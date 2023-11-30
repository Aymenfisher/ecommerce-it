import { createSlice,createAsyncThunk, createSelector } from "@reduxjs/toolkit";


export const fetchMessages = createAsyncThunk('inbox/fetchMessages', async () => { // fetch all messages
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/inbox`,{
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
    return json.messages
})

export const setMessageViewed = createAsyncThunk('inbox/setMessageViewed', async (_id) => { // set message as seen
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/inbox/${_id}`, {
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
})

export const deleteMessage = createAsyncThunk('inbox/deleteMessage', async (_id) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/inbox/${_id}`, {
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
})

const initialState = {
    messages: [],
    isLoadingFetchMessages: true,
    hasErrorFetchMessages: false,
    isLoadingSetMessageViewed: true,
    hasErrorSetMessageViewed: false,
    isLoadingDeleteMessage: true,
    hasErrorDeleteMessage: false
}
const inboxSlice = createSlice({
    name: 'inbox',
    initialState: initialState,
    extraReducers: (builder) => {
        // fetch messages
        builder.addCase(fetchMessages.pending, (state, action) => {
            state.isLoadingFetchMessages = true
            state.hasErrorFetchMessages = false
        })
        .addCase(fetchMessages.fulfilled, (state, action) => {
            state.messages = action.payload
            state.isLoadingFetchMessages = false
            state.hasErrorFetchMessages = false
        })
        .addCase(fetchMessages.rejected, (state, action) => {
            state.isLoadingFetchMessages = false
            state.hasErrorFetchMessages = true
        })

        // delete message
        builder.addCase(deleteMessage.pending, (state, action) => {
            state.isLoadingDeleteMessage = true
            state.hasErrorDeleteMessage = false
        })
        .addCase(deleteMessage.fulfilled, (state, action) => {
            state.messages = state.messages.filter(message => message._id != action.payload.deletedId)
            state.isLoadingDeleteMessage = false
            state.hasErrorDeleteMessage = false
        })
        .addCase(deleteMessage.rejected, (state, action) => {
            state.isLoadingDeleteMessage = false
            state.hasErrorDeleteMessage = true
        })

        // set message seen
        builder.addCase(setMessageViewed.pending, (state, action) => {
            state.isLoadingSetMessageViewed = true
            state.hasErrorSetMessageViewed = false
        })
        .addCase(setMessageViewed.fulfilled, (state, action) => {
            state.messages = state.messages.map(message =>{
                if(message._id == action.payload._id){
                    return {
                        ...message,
                        updatedAt:action.payload.updatedAt,
                        isOpened:true
                    }
                }
                return message
            })
            state.isLoadingSetMessageViewed = false
            state.hasErrorSetMessageViewed = false
        })
        .addCase(setMessageViewed.rejected, (state, action) => {
            state.isLoadingSetMessageViewed = false
            state.hasErrorSetMessageViewed = true
        })
    }
})

/*selectors */
//select messages
export const selectIsLoadingFetchMessages = state => state.inbox.isLoadingFetchMessages
export const selectHasErrorFetchMessages = state => state.inbox.hasErrorFetchMessages
export const selectMessages = state => state.inbox.messages

// delete messages feedback
export const selectIsLoadingDeleteMessage = state => state.inbox.isLoadingDeleteMessage
export const selectHasErrorDeleteMessage = state => state.inbox.hasErrorDeleteMessage


/* reducer */
export default inboxSlice.reducer