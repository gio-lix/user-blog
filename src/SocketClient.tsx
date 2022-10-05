import React, {useEffect} from 'react';
import {RootState, useAppDispatch, useAppSelector} from "./redux/store";
import {setCommentRemove, setComments, setLikes, setUnLikes} from "./redux/slices/postsSlice";

const SocketServer = () => {
    const dispatch = useAppDispatch()
    const {socket} = useAppSelector((state: RootState) => state.socket)
    const {user} = useAppSelector((state: RootState) => state.auth)

    useEffect(() => {
        socket.emit("joinUser", user._id)
    }, [socket, user._id])

    useEffect(() => {
        socket.on("likeToClient", (newPost: any) => {
            const {post, userId} = newPost.newPost
            dispatch(setLikes({postId: post._id, userId}))
        })
        return () => socket.off("likeToClient")
    }, [socket, dispatch])

    useEffect(() => {
        socket.on("unLikeToClient", (newPost: any) => {
            const {post, userId} = newPost.newPost
            dispatch(setUnLikes({postId: post?._id, userId}))
        })
        return () => socket.off("unLikeToClient")
    }, [socket, dispatch])

    useEffect(() => {
        socket.on("createCommentToClient", (newComment: any) => {
            console.log("newComment - ", newComment)
            dispatch(setComments({postId: newComment.postId, newComment: newComment.newComment}))
        })
        return () => socket.off("createCommentToClient")
    }, [socket, dispatch])

    useEffect(() => {
        socket.on("removeCommentToClient", (removeComment: any) => {
            const {comment, post} = removeComment
            dispatch(setCommentRemove({postId: post._id, commentId: comment._id}))
        })
        return () => socket.off("removeCommentToClient")
    }, [socket, dispatch])




    return (
        <>

        </>
    );
};

export default SocketServer;