import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "./slices/authSlices"
import {postsReducer} from "./slices/postsSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    posts: postsReducer
})

const store = configureStore({reducer: rootReducer})

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AddDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store