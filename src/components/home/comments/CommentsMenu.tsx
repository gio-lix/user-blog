import React, {FC} from 'react';
import {CommentState, PostsState, UserState} from "../../../typing";
import s from "./Comments.module.scss"
import {BsThreeDotsVertical} from "react-icons/bs"
import {GoPencil} from "react-icons/go";
import {AiFillDelete} from "react-icons/ai";
import {RootState, useAppDispatch, useAppSelector} from "../../../redux/store";
import {setCommentRemove} from "../../../redux/slices/postsSlice";
import axios from "axios";

interface Props {
    comment: CommentState
    post: PostsState
    auth: UserState
    setOnEdit: Function
}


const CommentsMenu:FC<Props> = ({comment,post,auth, setOnEdit}) => {
    const dispatch = useAppDispatch()
    const {token} = useAppSelector((state: RootState) => state.auth)



    const onHandleRemove = async () => {
        if (post.user._id === auth._id || comment.user._id === auth._id) {
            dispatch(setCommentRemove({postId: post._id,  commentId: comment._id}))
            try {
                await axios.delete(`/api/comment/${comment._id}`,  {
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
            <div className={s.menuItem} >
                <span onClick={() => setOnEdit(true)}>
                    <GoPencil /> Edit
                </span>
                <span onClick={onHandleRemove}>
                    <AiFillDelete /> Remove
                </span>
            </div>
        )
    }


    return (
        <div className={s.comment_menu}>
            {
                (post.user._id === auth._id || comment.user._id === auth._id) &&
                <div>
                    <span  >
                        <BsThreeDotsVertical />
                    </span>
                    <div  className={s.dop_down}>
                        {post.user._id === auth._id
                            ? comment.user._id === auth._id
                                ? <>{MenuItem()}</>
                                : (
                                    <div className={s.menuItem} >
                                        <span onClick={onHandleRemove}>
                                            <AiFillDelete /> Remove
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


