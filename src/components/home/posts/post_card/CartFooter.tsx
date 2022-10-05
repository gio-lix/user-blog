import React, {FC, useEffect, useState} from 'react';
import {PostsState} from "../../../../typing";
import s from "./PostCard.module.scss"
import {TbMessageCircle2} from "react-icons/tb"
import {BiPaperPlane} from "react-icons/bi"
import { BsFillBookmarkFill} from "react-icons/bs"
import {RiBookmarkLine, } from "react-icons/ri"
import {setLikes, setUnLikes} from "../../../../redux/slices/postsSlice";
import {RootState, useAppDispatch, useAppSelector} from "../../../../redux/store";
import LikeButton from "../../../LikeButton";
import axios from "axios";
import {setNotify} from "../../../../redux/slices/notifySlices";
import ShareModal from "../../../ShareModal";
import {BASE_URL} from "../../../../utils/config";
import {setRemovePosts, setSavePosts} from "../../../../redux/slices/authSlices";


interface Props {
    post: PostsState
}

const CartFooter: FC<Props> = ({post}) => {
    const dispatch = useAppDispatch()
    const {token, user} = useAppSelector((state: RootState) => state.auth)
    const {socket} = useAppSelector((state: RootState) => state.socket)
    const [isShare, setIsShare] = useState(false)
    const [saved, setSaved] = useState(false)


    const handleLike = async () => {
        dispatch(setLikes({postId: post?._id, userId: user?._id}))
        socket.emit("likePost", {post,userId: user?._id})
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
        socket.emit("unLikePost", {post,userId: user?._id})
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

    useEffect(() => {
        if (user?.saved?.find(el => el === post?._id)) {
            setSaved(true)
        }
    },[user.saved, post])


    const onHandleSave = async (id: string) => {
        dispatch(setSavePosts({postId: post._id}))
        try {
            await axios.put(`/api/savePost/${id}`,  null,{
                headers: {
                    'Authorization': `${token}`
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
    //unSavePost

    const onHandleUnSave = async (id: string) => {
        dispatch(setRemovePosts({postId: post._id}))
        try {
            await axios.put(`/api/unSavePost/${id}`,  null,{
                headers: {
                    'Authorization': `${token}`
                }
            })
        } catch (err) {
            console.log(err)
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
                    <span onClick={() => setIsShare(!isShare)}>
                        <BiPaperPlane/>
                    </span>
                </div>
                <div onClick={() => setSaved(!saved)} className={s.book_marker}>
                    {saved ? (
                        <span
                            // onClick={() => dispatch(setRemovePosts({postId: post._id, userId: user?._id}))}
                            onClick={() => onHandleUnSave(post._id)}
                        >
                            <BsFillBookmarkFill/>
                        </span>
                    ) : (
                        <span  onClick={() => onHandleSave(post._id)}>
                            <RiBookmarkLine/>
                        </span>
                    ) }
                </div>
            </div>
            <div >
                {isShare && (
                    <ShareModal url={`${BASE_URL}/post/${post._id}`}/>
                )}
            </div>
            <div>
                <h6>{post?.likes.length}</h6>
                <h6>{post?.comments.length} comments</h6>
            </div>
        </div>
    );
};

export default CartFooter;