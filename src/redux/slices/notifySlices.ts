import {createSlice, PayloadAction} from "@reduxjs/toolkit";




const initialState = {
    status: "loaded",
    notify: {
        success: [],
        error: [],
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
            state.status = "loaded"
        },
        setNotifyReset: (state:State) => {
            state.notify.success = []
            state.notify.error = []
            state.status = "loaded"
        }
    }
})

export const  {setNotify, setNotifyReset} = notifySlices.actions
export const notifyReducer = notifySlices.reducer