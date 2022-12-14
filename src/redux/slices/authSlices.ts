import axios from "axios";

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setNotify} from "./notifySlices";
import {UserState} from "../../typing";

interface User extends UserState {
    saved: string[]
}

const initialState = {
    status: "loaded",
    user: {} as User,
    users: [] as any | [],
    profilePosts: {
        posts: [] as any | [],
        result: 0,
        page: 2,
        _id: ""
    },
    profile: null as UserState | null,
    ids: [] as any | [],
    token: null
}
type State = typeof initialState

export const postDataApi = createAsyncThunk<Object, any>(
    "auth/fetchUserData",
    async (params, {dispatch}) => {
        try {
            const {data} = await axios.post("/api/login", params)
            dispatch(setNotify({success: [{msg: data.msg}]}))
            return data
        } catch (err) {
            return err
        }
    })
export const refreshDataApi = createAsyncThunk<any>(
    "auth/refreshDataApi",
    async (_, thunkAPI) => {
        try {
            const {data} = await axios.post("/api/refresh_token")
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    })
export const postRegisterDataApi = createAsyncThunk<Object, any>(
    "auth/postRegisterDataApi",
    async (params, thunkAPI) => {
        try {
            const {data} = await axios.post("/api/register", params)
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    })
export const postProfileDataApi = createAsyncThunk<Object, any>(
    "auth/postProfileDataApi",
    async (params, thunkAPI) => {
        const {id, token} = params

        try {
            const {data} = await axios.get(`/api/user/${id}`, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    })
export const postProfilePosts = createAsyncThunk<Object, any>(
    "auth/postProfilePosts",
    async (params, thunkAPI) => {
        const {id, token} = params

        try {
            const {data} = await axios.get(`/api/user_post/${id}`, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    })

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setFollowers: (state: State, {payload}: any) => {
            state.profile = payload
        },
        setFollowing: (state: State, {payload}: any) => {
            state.user = payload
        },
        setProfileUsers: (state: State, action: any) => {
            state.ids.push(action.payload._id)
            state.users.push(action.payload)
        },
        setProfilePosts: (state: State, action: any) => {
            state.profilePosts.posts = [...state.profilePosts.posts, ...action.payload.post]
            state.profilePosts.result = state.profilePosts.result + action.payload.result
            state.profilePosts.page = state.profilePosts.page + 1
        },
        setUpdateUser: (state: State, action: any) => {
            state.user = {...state.user, ...action.payload.user}
        },

        setSavePosts: (state: State, {payload}: any) => {
            if (state.user.saved) {
                state.user.saved = [...state.user.saved, payload.postId]
            } else {
                state.user.saved = [payload.postId]
            }
        },
        setRemovePosts: (state: State, {payload}: any) => {
            state.user.saved = state.user.saved.filter(e => e !== payload.postId)
        },
        setProfilePostsPosts: (state: State, {payload}: any) => {
            state.profilePosts.page = 2
            state.profilePosts.posts = payload.post
            state.profilePosts.result = payload.result
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(postDataApi.pending, (state: State) => {
                state.status = "loading"
            })
            .addCase(postDataApi.fulfilled, (state: State, {payload}: any) => {

                state.token = payload.access_token
                state.user = payload.user
                state.status = "loaded"
            })
            .addCase(postDataApi.rejected, (state: State) => {
                state.status = "loaded"
            })

            .addCase(refreshDataApi.fulfilled, (state: State, {payload}: any) => {
                state.token = payload.access_token
                state.user = payload.user
            })

            //   register
            .addCase(postRegisterDataApi.pending, (state: State) => {
                state.status = "loading"
            })
            .addCase(postRegisterDataApi.fulfilled, (state: State, {payload}: any) => {
                state.token = payload.access_token
                state.user = payload.user
                state.status = "loaded"
            })
            .addCase(postRegisterDataApi.rejected, (state: State, {payload}: any) => {
                state.status = "loaded"
            })

            //   profile
            .addCase(postProfileDataApi.pending, (state: State) => {
                state.status = "loading"
            })
            .addCase(postProfileDataApi.fulfilled, (state: State, {payload}: any) => {
                state.profile = payload.user
                state.status = "loaded"
            })
            .addCase(postProfileDataApi.rejected, (state: State, {payload}: any) => {
                state.status = "loaded"
            })


            .addCase(postProfilePosts.pending, (state: State) => {
                state.status = "loading"
            })
            .addCase(postProfilePosts.fulfilled, (state: State, {payload}: any) => {
                state.status = "loaded"
                state.profilePosts.posts = payload.post
                state.profilePosts.result = payload.result
                state.profilePosts.page = 2
            })
    }
});


export const {
    setFollowers,
    setProfilePostsPosts,
    setFollowing,
    setProfileUsers,
    setUpdateUser,
    setProfilePosts,
    setSavePosts,
    setRemovePosts

} = authSlice.actions


export const authReducer = authSlice.reducer