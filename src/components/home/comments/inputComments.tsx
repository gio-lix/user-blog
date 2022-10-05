import React, {FC, SyntheticEvent, useState} from 'react';
import {PostsState} from "../../../typing";
import s from "./Comments.module.scss"
import {RootState, useAppDispatch, useAppSelector} from "../../../redux/store";
import {setComments} from "../../../redux/slices/postsSlice";
import axios from "axios";
import clsx from "clsx";

interface Props {
    post: PostsState
    onReply?: any
    setOnReply?: Function
    children?: React.ReactNode
}

const InputComments: FC<Props> = ({post, children, setOnReply, onReply}) => {
    const dispatch = useAppDispatch()
    const [content, setContent] = useState("")
    const {user, token} = useAppSelector((state: RootState) => state.auth)
    const {theme} = useAppSelector((state: RootState) => state.notify)
    const {socket} = useAppSelector((state: RootState) => state.socket)


    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        if (!content.trim()) {
            if (setOnReply) return setOnReply(false)
            return
        }

        const newComment = {
            content,
            likes: [],
            user,
            createdAt: new Date().toISOString(),
            reply: onReply && onReply.commentId,
            tag: onReply && onReply.user
        }


        try {
            const {data} = await axios.post(`/api/comment`, {
                ...newComment,
                postId: post?._id,
                postUserId: post?.user._id
            }, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            dispatch(setComments({postId: post?._id, newComment: data.newComment}))
            socket.emit("createComment", {postId: post?._id, newComment: data.newComment})
        } catch (err) {
            console.log("err - ", err)
        }

        setContent("")
        if (setOnReply) return setOnReply(false)

    }
    return (
        <form onSubmit={handleSubmit} className={clsx(s.input_comment,
            theme === "light" && s.input_dark
            )}>
            {children}
            <input
                type="text"
                placeholder="Add your comments...."
                value={content}
                className={clsx(!!onReply ? s.input_comment_onReply : null)}
                onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit">Post</button>
        </form>
    );
};

export default InputComments;