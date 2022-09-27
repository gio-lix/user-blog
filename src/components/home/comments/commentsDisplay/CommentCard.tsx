import React, {FC, useEffect, useState} from 'react';
import {CommentState, PostsState, UserState} from "../../../../typing";
import s from "./CommentDisplay.module.scss"
import {NavLink} from "react-router-dom";
import moment from "moment";
import clsx from "clsx";
import {
    setCommentLike,
    setCommentUnLike,
    setUpdateComment
} from "../../../../redux/slices/postsSlice";
import {RootState, useAppDispatch, useAppSelector} from "../../../../redux/store";
import LikeButton from "../../../LikeButton";
import CommentsMenu from "../CommentsMenu";
import axios from "axios";
import {setNotify} from "../../../../redux/slices/notifySlices";
import InputComments from "../inputComments";

interface Props {
    children?: React.ReactNode
    comment: CommentState
    post: PostsState
    commentId: string
}

const CommentCard: FC<Props> = ({children, comment,commentId, post}) => {
    const dispatch = useAppDispatch()
    const {token, user} = useAppSelector((state: RootState) => state.auth)
    const [content, setContent] = useState<string>("")
    const [readMore, setReadMore] = useState<boolean>(false)
    const [onEdit, setOnEdit] = useState<boolean>(false)
    const [loadLike, setLoadLike] = useState<boolean>(false)
    const [onReply, setOnReply] = useState<boolean | object>(false)



    useEffect(() => {
        setContent(comment.content)
    }, [comment])

    const onHandleLike = async () => {

        if (loadLike) return

        dispatch(setCommentLike({postId: post._id, commentId: comment._id, user}))

        try {
            await axios.put(`/api/comment/${comment._id}/like`, null, {
                headers: {
                    'Authorization': `${token}`
                }
            })
        } catch (err) {
            console.log("err - ", err)
        } finally {
            setLoadLike(false)
        }
    }
    const onHandleUnlike = async () => {

        if (loadLike) return

        dispatch(setCommentUnLike({postId: post._id, commentId: comment._id, user}))

        try {
            await axios.put(`/api/comment/${comment._id}/unlike`, null, {
                headers: {
                    'Authorization': `${token}`
                }
            })
        } catch (err) {
            console.log("err - ", err)
        } finally {
            setLoadLike(false)
        }
    }
    const onHandleUpdate = async () => {
        if (comment.content !== content) {
            dispatch(setUpdateComment({postId: post._id, comment}))
            try {
                await axios.put(`/api/comment/${comment._id}`, {content}, {
                    headers: {
                        'Authorization': `${token}`
                    }
                })
            } catch (err) {
                dispatch(setNotify({error: [(err as any).response.data]}))
            }
        } else {
            setOnEdit(false)
        }
        setOnEdit(false)
    }

    const onHandleReply = () => {
            if (onReply) return setOnReply(false)
            setOnReply({...comment, commentId})
    }


    return (
        <section className={s.root}>
            <div>
                <NavLink to={`/profile/${comment.user._id}`}>
                    <img src={comment.user.avatar} alt="avatar"/>
                    <h6>{comment.user.username}</h6>
                </NavLink>
            </div>
            <div className={s.comment_content_box}>
                <div>
                    {
                        onEdit ? (
                            <textarea
                                className={s.textarea}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        ) : (
                            <>
                                <p>
                                    {comment.tag && comment.tag._id !== comment.user._id && (
                                        <NavLink style={{marginRight: "10px"}} to={`/profile/${comment.tag._id}`}>
                                            @{comment.tag.username}
                                        </NavLink>
                                    )}
                                    {content?.length < 100
                                        ? content
                                        : readMore ? content + "  " : content?.slice(0, 100) + "..."
                                    }
                                    {
                                        content?.length > 100 &&
                                        <span
                                            className={clsx(readMore ? s.readMore : s.readLess)}
                                            onClick={() => setReadMore(!readMore)}
                                        >
                                                 {readMore ? "Hide content" : "Read more"}
                                        </span>
                                    }
                                </p>

                            </>
                        )
                    }

                </div>
                <div className={s.comment_content_nav}>
                    <small>
                        {moment(comment.createAt).fromNow()}
                    </small>
                    <small>
                        {comment.likes.length} likes
                    </small>
                    {
                        onEdit ? (
                            <>
                                <small onClick={onHandleUpdate}>
                                    update
                                </small>
                                <small onClick={() => setOnEdit(false)}>
                                    cancel
                                </small>
                            </>
                        ) : (
                            <small onClick={onHandleReply}>
                                {onReply ? "cancel" : "reply"}
                            </small>
                        )
                    }


                    <div className={s.like_box}>
                        <LikeButton
                            like={!!comment.likes.find((el: UserState) => el._id === user?._id)}
                            handleLike={() => onHandleLike()}
                            handleUnlike={() => onHandleUnlike()}
                        />

                        <div className={s.moreDots}>
                            <CommentsMenu
                                setOnEdit={setOnEdit}
                                comment={comment}
                                post={post}
                                auth={user!}
                            />
                        </div>
                    </div>
                </div>
            </div>


            <div className={s.comment_content_like_box}>
                {onReply &&
                    <InputComments
                        post={ post}
                        onReply={onReply}
                        setOnReply={setOnReply}
                    >
                        <NavLink to={`/profile/${(onReply as CommentState).user?._id}`}>
                            @{(onReply as CommentState).user.username}:
                        </NavLink>

                    </InputComments>
                }
            </div>
            <div>
                {children}
            </div>
        </section>
    );
};

export default CommentCard;