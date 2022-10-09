import axios from "axios";

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {setNotify} from "./notifySlices";


const initialState = {
    status: "loaded",
    posts: [] as any | [],
    result: 0,
    page: 2
}
type State = typeof initialState


export const getSavedPostApi = createAsyncThunk<Object, any>(
    "post/getSavedPostApi",
    async (params, {dispatch}) => {
        try {
            const {data} = await axios.get(`/api/getSavedPost`, {
                headers: {
                    'Authorization': `${params.token}`
                }
            })
            return data
        } catch (err) {
            return dispatch(setNotify({error: [(err as any).response.data]}))
        }
    }
)

const postSavedSlice = createSlice({
    name: "savedPost",
    initialState,
    reducers: {
        setAddSavedPosts: (state: State, {payload}: any) => {
            state.posts = [...state.posts, ...payload.posts]
            state.result = state.result + payload.result
            state.page = state.page + 1
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSavedPostApi.pending, (state: State) => {
                state.status = "loading"
            })
            .addCase(getSavedPostApi.fulfilled, (state: State, {payload}: any) => {
                state.status = "loaded"
                state.posts = payload.savedPosts
                state.result = payload.result
                state.page = 2
            })
    }
})
export const {setAddSavedPosts} = postSavedSlice.actions
export const savedPostsReducer = postSavedSlice.reducer