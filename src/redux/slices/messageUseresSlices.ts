import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ChatDataState, ChatUsersState} from "../../typing";






const initialState = {
    users: [] as ChatUsersState[],
    resultUsers: 0,
    data: [] as ChatDataState[],
    resultData: 0,
    firstLoad: false
}

type State = typeof initialState

const messageUsersSlices = createSlice({
    name: "messageUsers",
    initialState,
    reducers: {
        addMessageUsers: (state: State, {payload}: PayloadAction<{user: ChatUsersState}>) => {
            if (state.users.every((item: ChatUsersState) => item._id !== payload.user._id)) {
                state.users.push(payload.user)
            }

        },
        addMessageData: (state: State, {payload}: PayloadAction<ChatDataState>) => {
            state.data.push(payload)
            state.users = state.users.map((user: ChatUsersState) =>
                user._id === payload.recipient || user._id === payload.sender
                    ? {...user, text: payload.text, media: payload.media}
                    : user
            )
        },
        setConversation: (state: State, {payload}: PayloadAction<{result: number, data: ChatUsersState}>) => {
            state.users = [payload.data]
            state.resultUsers = payload.result
            state.firstLoad = true
        },
        addMessageDataApi: (state: State, {payload}: PayloadAction<{result: number, messages: ChatDataState[]}>) => {
            state.resultData = payload.result
            state.data = payload.messages.reverse()
        }
    }
})


export const {addMessageUsers, addMessageData, addMessageDataApi, setConversation} = messageUsersSlices.actions

export const messageUsersReducers = messageUsersSlices.reducer