import {AnyAction, createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import axios from "axios";
import {setNotify} from "./notifySlices";
import {PostsState} from "../../typing";


const initialState = {
    status: "loaded",
    modal: false,
    edit: null as PostsState | null,
    posts: [] as PostsState[],
    result: 0,
    pages: 2
}


type State = typeof initialState


export const createPosts = createAsyncThunk<Object, any>(
    "posts/createPosts",
    async (params, {dispatch}) => {
        const {token, content, images} = params

        try {
            const {data} = await axios.post(`/api/posts`, {content, images}, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            dispatch(setNotify({success: [{msg: data.msg}]}))
            return data
        } catch (err) {
            return dispatch(setNotify({error: [(err as any).response.data]}))

        }
    }
)
export const updatePosts = createAsyncThunk<Object, any>(
    "posts/updatePosts",
    async (params, {dispatch}) => {
        const {token, content, images, id} = params

        try {
            const {data} = await axios.put(`/api/posts/${id}`, {content, images}, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            dispatch(setNotify({success: [{msg: data.msg}]}))
            return data
        } catch (err) {
            dispatch(setNotify({error: [(err as any).response.data]}))
            return
        }
    }
)
export const getPosts = createAsyncThunk<Object, any>(
    "posts/getPosts",
    async (params, {dispatch}) => {
        try {
            const {data} = await axios.get(`/api/posts`, {
                headers: {
                    'Authorization': `${params}`
                }
            })
            return data
        } catch (err) {
            dispatch(setNotify({error: [(err as any).response.data]}))
            return
        }
    }
)
export const likePost = createAsyncThunk<Object, any>(
    "posts/likePost",
    async (params, {dispatch, getState}) => {
        const {token, postId, userId} = params
        try {
            const {data} = await axios.put(`/api/posts/${postId}/like`, null, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            return {data, postId, userId}
        } catch (err) {
            dispatch(setNotify({error: [(err as any).response.data]}))
            return
        }
    }
)


const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setModal: (state: State, action: any) => {
            state.modal = action.payload
        },
        setEdit: (state: State, action: any) => {
            state.edit = action.payload
        },
        setComments: (state: State, action: any) => {
            const {postId, newComment, user} = action.payload
            let findIndex = state.posts.findIndex(e => e._id === postId)
            state.posts[findIndex].comments.push(newComment)
        },
        setLikes: (state: State, action: any) => {
            const findIndex = state.posts.findIndex(e => e._id === action.payload.postId)
            state.posts[findIndex].likes.push(action.payload.userId)
        },
        setUnLikes: (state: State, {payload}: any) => {
            const findIndex = state.posts.findIndex(e => e._id === payload.postId)
            state.posts[findIndex].likes.includes(payload.userId) && state.posts[findIndex].likes.pop()
        },
        setCommentLike: (state: State, {payload}: any) => {
            const findIndex = state.posts.findIndex(e => e._id === payload.postId)
            const findCommentIndex = current(state.posts[findIndex]).comments.findIndex(e => e._id === payload.commentId)

            state.posts[findIndex].comments[findCommentIndex].likes.push(payload.user)
        },
        setCommentUnLike: (state: State, {payload}: any) => {
            const findIndex = state.posts.findIndex(e => e._id === payload.postId)
            const findCommentIndex = current(state.posts[findIndex]).comments.findIndex(e => e._id === payload.commentId)

            state.posts[findIndex].comments[findCommentIndex].likes = state.posts[findIndex].comments[findCommentIndex].likes.filter((el: any) => el._id !== payload.user._id)
        },

        setUpdateComment: (state: State, {payload}: any) => {
            const findIndex = state.posts.findIndex(e => e._id === payload.postId)
            state.posts[findIndex].comments.map(com => {
                if (com._id === payload.comment) {
                    return payload.comment
                }
                return com
            })

        },
        setCommentRemove: (state:State, {payload}: any) => {
            let findPostIdx = state.posts.findIndex(post => post._id === payload.postId)
            state.posts[findPostIdx].comments = state.posts[findPostIdx].comments.filter(el => el._id !== payload.commentId)

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPosts.pending, (state: State) => {
                state.status = "loading"
            })
            .addCase(createPosts.fulfilled, (state: State, {payload}: any) => {
                console.log("payload -", payload.newPost)
                state.posts.unshift(payload.newPost)
                state.status = "loaded"

            })

            // update
            .addCase(updatePosts.pending, (state: State) => {
                state.status = "loading"
            })
            .addCase(updatePosts.fulfilled, (state: State, {payload}: any) => {
                const findIndex = state.posts.findIndex(e => e._id === payload.newPost._id)
                state.posts.splice(findIndex, 1, payload.newPost)
                state.status = "loaded"
            })

            // get posts
            .addCase(getPosts.pending, (state: State) => {
                state.status = "loading"
            })
            .addCase(getPosts.fulfilled, (state: State, {payload}: any) => {
                state.status = "loaded"
                state.posts = payload.posts
                state.result = payload.result
            })


            // likes
            .addCase(likePost.pending, (state: State) => {
                state.status = "loading"
            })
            .addCase(likePost.fulfilled, (state: State, {payload}: any) => {
                state.posts.map(post => {
                    if (post._id === payload.postId) {
                        return post.likes.push(payload.userId)
                    }
                    return post
                })
                state.status = "loaded"
            })

    }
})

export const {
    setModal,
    setEdit,
    setComments,
    setLikes,
    setUnLikes,
    setUpdateComment,
    setCommentLike,
    setCommentUnLike,
    setCommentRemove
} = postsSlice.actions

export const postsReducer = postsSlice.reducer
