import axios from "axios";

import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";

import {NotifyPostsState} from "../../typing";

const initialState = {
    status: "loaded",
    posts: [] as NotifyPostsState[],
    sound: false
}

type State = typeof initialState

export const getNotifiesApi = createAsyncThunk<Object, any>(
    "post/getSavedPostApi",
    async (params) => {
        try {
            const {data} = await axios.get(`/api/notifies`, {
                headers: {
                    'Authorization': `${params.token}`
                }
            })
            return data.notifies
        } catch (err) {
            console.log(err)
        }
    }
)


const postNotifySlice = createSlice({
    name: "postNotify",
    initialState,
    reducers: {
        setPostNotify: (state: State, {payload}: any) => {
            state.posts.unshift(payload)
        },
        setDeletePostNotify: (state: State, {payload}: any) => {
            state.posts = state.posts.filter((post: any) => post._id !== payload._id)
        },
        setDeleteAll: (state: State) => {
            state.posts = []
        },
        setUpdatePostNotify: (state: State, {payload}: any) => {
            let findIndex = state.posts.findIndex(item => item._id === payload._id)
            state.posts[findIndex].isRead = true
        },
        setSound: (state: State,{payload}: any) => {
            state.sound = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotifiesApi.pending, (state: State) => {
                state.status = "loading"
            })
            .addCase(getNotifiesApi.fulfilled, (state: State, {payload}: any) => {
                state.status = "loaded"
                state.posts = payload
            })
    }
})


export const {
    setSound,
    setPostNotify,
    setDeletePostNotify,
    setDeleteAll,
    setUpdatePostNotify
} = postNotifySlice.actions

export const postNotifySliceReducer = postNotifySlice.reducer