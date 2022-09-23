import {createSlice, PayloadAction} from "@reduxjs/toolkit";




const initialState = {
    notify: {
        success: [],
        error: []
    }
}

type State = typeof initialState

const notifySlices = createSlice({
    name: "notify",
    initialState,
    reducers: {
        setNotify: (state:State,action: PayloadAction<any>) => {
            const {success, error} = action.payload
            state.notify.success = success
            state.notify.error = error
        },
        setNotifyReset: (state:State) => {
            state.notify.success = []
            state.notify.error = []
        }
    }
})

export const  {setNotify, setNotifyReset} = notifySlices.actions
export const notifyReducer = notifySlices.reducer