import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: "loaded",
    posts: null,
    images: null
}


type State = typeof initialState


export const createPosts = createAsyncThunk<Object, any>(
    "posts/createPosts",
    async (params, thunkAPI) => {
        const {token, content, images} = params
        try {
            const {data} = await axios.post(`/api/posts`, {content, images},{
                headers: {
                    'Authorization': `${token}`
                }
            })
            console.log("data - > > " , data)
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }

)


const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(createPosts.pending, (state: State) => {
            state.status = "loading"
        })
        builder.addCase(createPosts.fulfilled, (state: State, {payload}: any) => {
            state.posts = payload
        })
    }
})

// export const { createPosts} = postsSlice.actions
export const postsReducer = postsSlice.reducer
