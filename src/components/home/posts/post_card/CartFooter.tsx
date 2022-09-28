import React, {FC} from 'react';
import {PostsState} from "../../../../typing";
import s from "./PostCard.module.scss"
import {TbMessageCircle2} from "react-icons/tb"
import {BiPaperPlane} from "react-icons/bi"
import {RiBookmarkLine} from "react-icons/ri"
import {setLikes, setUnLikes} from "../../../../redux/slices/postsSlice";
import {RootState, useAppDispatch, useAppSelector} from "../../../../redux/store";
import LikeButton from "../../../LikeButton";
import axios from "axios";
import {setNotify} from "../../../../redux/slices/notifySlices";


interface Props {
    post: PostsState
}

const CartFooter: FC<Props> = ({post}) => {
    const dispatch = useAppDispatch()
    const {token, user} = useAppSelector((state: RootState) => state.auth)


    const handleLike = async () => {
        dispatch(setLikes({postId: post?._id, userId: user?._id}))
        try {
            await axios.put(`/api/posts/${post?._id}/like`, null, {
                headers: {
                    'Authorization': `${token}`
                }
            })
        } catch (err) {
            dispatch(setNotify({error: [(err as any).response.data]}))
            return
        }
    }
    const handleUnlike = async () => {
        dispatch(setUnLikes({postId: post?._id, userId: user?._id}))
        try {
            await axios.put(`/api/posts/${post?._id}/unlike`, null, {
                headers: {
                    'Authorization': `${token}`
                }
            })
        } catch (err) {
            dispatch(setNotify({error: [(err as any).response.data]}))
            return
        }
    }

    return (
        <div className={s.footer}>
            <div>
                <div className={s.footer_icon}>
                    <LikeButton
                        like={post?.likes.includes(user?._id!)}
                        handleLike={() => handleLike()}
                        handleUnlike={() => handleUnlike()}
                    />
                    <span>
                        <TbMessageCircle2/>
                    </span>
                    <span>
                        <BiPaperPlane/>
                    </span>
                </div>

                <RiBookmarkLine/>
            </div>
            <div>
                <h6>{post?.likes.length}</h6>
                <h6>{post?.comments.length} comments</h6>
            </div>
        </div>
    );
};

export default CartFooter;