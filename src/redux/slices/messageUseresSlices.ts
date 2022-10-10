import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    users: [] as any,
    resultUsers: 0,
    data: [],
    resultData: 0,
    firstLoad: false
}

type State = typeof initialState

const messageUsersSlices = createSlice({
    name: "messageUsers",
    initialState,
    reducers: {
        addMessageUsers: (state: State, {payload}: any) => {
            if (state.users.every((item: any) => item._id !== payload.user._id )) {
                 state.users.push(payload.user)
            }


        }
    }
})


export const {addMessageUsers} = messageUsersSlices.actions

export const messageUsersReducers = messageUsersSlices.reducer