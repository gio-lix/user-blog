import React, {FC, useState} from 'react';
import {PostsState} from "../../../../typing";
import s from "./PostCard.module.scss"
import {TbMessageCircle2} from "react-icons/tb"
import {BiPaperPlane} from "react-icons/bi"
import {RiBookmarkLine} from "react-icons/ri"
import {likePost, unLikePost} from "../../../../redux/slices/postsSlice";
import {RootState, useAppDispatch, useAppSelector} from "../../../../redux/store";
import LikeButton from "../../../LikeButton";


interface Props {
    post: PostsState
}

const CartFooter:FC<Props> = ({post}) => {
    const dispatch = useAppDispatch()
    const {token, user} = useAppSelector((state: RootState) => state.auth)

    const handleLike = () => {
        dispatch(likePost({token, postId:  post._id, userId: user?._id}))
    }
    const handleUnlike = () => {
        dispatch(unLikePost({token, postId:  post._id, userId: user?._id}))
    }

    return (
        <div className={s.footer}>
            <div>
                <div className={s.footer_icon}>
                    <LikeButton
                        like={post.likes.includes(user?._id!) }
                        handleLike={() => handleLike()}
                        handleUnlike={() => handleUnlike()}
                    />
                    <span>
                        <TbMessageCircle2 />
                    </span>
                    <span>
                        <BiPaperPlane />
                    </span>
                </div>

                <RiBookmarkLine />
            </div>
            <div>
                <h6>{post.likes.length}</h6>
                <h6>{post.comments.length} comments</h6>
            </div>
        </div>
    );
};

export default CartFooter;