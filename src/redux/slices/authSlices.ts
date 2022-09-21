import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {UserState, ValidState} from "../../typing";

interface MessageProps extends ValidState {
    title: string
}


const initialState = {
    status: "loaded",
    error: null as MessageProps | null,
    success: null,
    notify: null,
    user: null as UserState | null,
    profile: null as UserState | null,
    token: null
}
type State = typeof initialState


export const postDataApi = createAsyncThunk<Object, any>(
    "auth/fetchUserData",
    async (params, thunkAPI) => {
        try {
            const {data} = await axios.post("/api/login", params)
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
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
        setShow: (state: State) => {
            state.error = null
            state.success = null
        },
        setError: (state: State, action: any) => {
            state.error = action.payload
        },
        setFollowers: (state: State, action: any) => {
            state.profile = action.payload
        },
        setFollowing: (state: State, action: any) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postDataApi.pending, (state: State) => {
            state.status = "loading"
        })
        builder.addCase(postDataApi.fulfilled, (state: State, {payload}: any) => {
            state.success = payload.msg
            state.token = payload.access_token
            state.user = payload.user
            state.status = "loaded"
        });
        builder.addCase(postDataApi.rejected, (state: State, {payload}: any) => {
            state.status = "loaded"
            state.error = payload.response.data.msg
        })

        builder.addCase(refreshDataApi.fulfilled, (state: State, {payload}: any) => {
            state.token = payload.access_token
            state.user = payload.user
        })


        builder.addCase(postRegisterDataApi.pending, (state: State) => {
            state.status = "loading"
        })
        builder.addCase(postRegisterDataApi.fulfilled, (state: State, {payload}: any) => {
            state.success = payload.msg
            state.token = payload.access_token
            state.user = payload.user
            state.status = "loaded"
        });
        builder.addCase(postRegisterDataApi.rejected, (state: State, {payload}: any) => {
            state.status = "loaded"
            state.error = payload.response.data.msg
        })

        //   profile
        builder.addCase(postProfileDataApi.pending, (state: State) => {
            state.status = "loading"
        })
        builder.addCase(postProfileDataApi.fulfilled, (state: State, {payload}: any) => {
            state.profile = payload.user
            state.status = "loaded"
        });
        builder.addCase(postProfileDataApi.rejected, (state: State, {payload}: any) => {
            state.status = "loaded"
            state.error = payload.response.data.msg
        })


    }
});


export const {setShow, setError, setFollowers, setFollowing} = authSlice.actions
export const authReducer = authSlice.reducer