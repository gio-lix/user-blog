import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {UserState} from "../../typing";
import {setNotify} from "./notifySlices";


const initialState = {
    status: "loaded",
    user: null as UserState | null,
    profile: null as UserState | null,
    token: null
}
type State = typeof initialState


// export const updateUserApi = createAsyncThunk<Object, any>(
//     "auth/updateUserApi",
//     async (params, {dispatch}) => {
//         const {token, user} = params
//         try {
//             const {data} = await axios.put(`/api/user`, {...user}, {
//                 headers: {
//                     'Authorization': `${token}`
//                 }
//             })
//             return data
//         } catch (err) {
//             console.log("err - ", err)
//         }
//     })

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


const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setFollowers: (state: State, action: any) => {
            state.profile = action.payload
        },
        setFollowing: (state: State, action: any) => {
            state.user = action.payload
        },
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
            .addCase(postDataApi.rejected, (state: State, {payload}: any) => {
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


            // profile update
            // .addCase(updateUserApi.pending, (state: State) => {
            //     state.status = "loading"
            // })
            // .addCase(updateUserApi.fulfilled, (state: State, {payload}: any) => {
            //     state.status = "loaded"
            //     state.user = payload.user
            // })

    }
});


export const {setFollowers, setFollowing} = authSlice.actions
export const authReducer = authSlice.reducer