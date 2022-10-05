import React, {FC} from 'react';
import {CommentState, PostsState, UserState} from "../../../typing";
import s from "./Comments.module.scss"
import {BsThreeDotsVertical} from "react-icons/bs"
import {GoPencil} from "react-icons/go";
import {AiFillDelete} from "react-icons/ai";
import {RootState, useAppDispatch, useAppSelector} from "../../../redux/store";
import {setCommentRemove} from "../../../redux/slices/postsSlice";
import axios from "axios";
import clsx from "clsx";

interface Props {
    comment: CommentState
    post: PostsState
    auth: UserState
    setOnEdit: Function
}


const CommentsMenu: FC<Props> = ({comment, post, auth, setOnEdit}) => {
    const dispatch = useAppDispatch()
    const {token} = useAppSelector((state: RootState) => state.auth)
    const {theme} = useAppSelector((state: RootState) => state.notify)
    const {socket} = useAppSelector((state: RootState) => state.socket)


    const onHandleRemove = async () => {

        if (post.user._id === auth._id || comment.user._id === auth._id) {
            dispatch(setCommentRemove({postId: post._id, commentId: comment._id}))
            socket.emit("removeComment", {comment, post})

            try {
                await axios.delete(`/api/comment/${comment._id}`, {
                    headers: {
                        'Authorization': `${token}`
                    }
                })
            } catch (err) {
                console.log(err)
            }
        }

    }


    const MenuItem = () => {
        return (
            <div className={clsx(s.menuItem,
                    theme === "light" && s.menuItem_theme
                )}>
                <span onClick={() => setOnEdit(true)}>
                    <GoPencil/> Edit
                </span>
                <span onClick={onHandleRemove}>
                    <AiFillDelete/> Remove
                </span>
            </div>
        )
    }


    return (
        <div className={s.comment_menu}>
            {
                (post.user._id === auth._id || comment.user._id === auth._id) &&
                <div>
                    <span>
                        <BsThreeDotsVertical/>
                    </span>
                    <div className={clsx(s.dop_down,
                        theme === "light" && s.dop_down_theme
                    )}>
                        {post.user._id === auth._id
                            ? comment.user._id === auth._id
                                ? <>{MenuItem()}</>
                                : (
                                    <div className={s.menuItem}>
                                        <span onClick={onHandleRemove}>
                                            <AiFillDelete/> Remove
                                        </span>
                                    </div>
                                )
                            : comment.user._id === auth._id && (<>{MenuItem()}</>)
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default CommentsMenu;


