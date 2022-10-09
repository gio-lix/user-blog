import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    theme: localStorage.getItem("blog_theme") || "light",
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
        setNotify: (state: State, action: PayloadAction<any>) => {
            const {success, error} = action.payload
            state.notify.success = success
            state.notify.error = error
            state.status = "loaded"
        },
        setNotifyReset: (state: State) => {
            state.notify.success = []
            state.notify.error = []
            state.status = "loaded"
        },
        setTheme: (state: State, action: PayloadAction<any>) => {
            state.theme = action.payload
        }
    }
})

export const {
    setNotify,
    setNotifyReset,
    setTheme
} = notifySlices.actions

export const notifyReducer = notifySlices.reducer