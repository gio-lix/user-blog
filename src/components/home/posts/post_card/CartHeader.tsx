import React, {FC, useEffect, useRef, useState} from 'react';
import {PostsState} from "../../../../typing";
import s from "./PostCard.module.scss"
import {Link} from "react-router-dom";
import moment from "moment";
import {HiDotsHorizontal} from "react-icons/hi"
import {RootState, useAppDispatch, useAppSelector} from "../../../../redux/store";
import {GoPencil} from "react-icons/go"
import {AiFillDelete, AiOutlineCopy} from "react-icons/ai"
import {setEdit, setModal} from "../../../../redux/slices/postsSlice";
import clsx from "clsx";

interface Props {
    post: PostsState
}

const CartHeader: FC<Props> = ({post}) => {
    const {user} = useAppSelector((state: RootState) => state.auth)
    const {theme} = useAppSelector((state:RootState) => state.notify)
    const dispatch = useAppDispatch()
    const [drop, setDrop] = useState<boolean>(false)
    const useInfoRef = useRef<HTMLDivElement | null>(null)

    const handleClickRef = (e: any) => {
        if (!e.path.includes(useInfoRef.current)) {
            setDrop(false)
        }
    }
    useEffect(() => {
        window.addEventListener("click", handleClickRef)
        return () => window.removeEventListener("click", handleClickRef)
    }, [useInfoRef.current])


    const handleEditPost = () => {
        setDrop(false)
        dispatch(setModal(true))
        dispatch(setEdit(post))
    }


    return (
        <div className={s.header}>
            <div>
                <img
                    className={s.header_avatar}
                    src={post?.user?.avatar}
                    alt="avatar"
                    loading='lazy'
                />
                <div>
                    <h6>
                        <Link to={`/profile/${post?.user._id}`}>
                            {post?.user.username}
                        </Link>
                    </h6>
                    <small>
                        {moment(post?.createdAt).fromNow()}
                    </small>
                </div>
            </div>
            <div ref={useInfoRef} className={s.header_drop}>
                <span className={clsx(theme === "light" ? s.dropDown_black : s.dropDown )} onClick={() => setDrop(!drop)}>
                    <HiDotsHorizontal/>
                </span>
                {(drop && user?._id === post?.user._id) && (
                    <div className={clsx(s.header_drop_menu,
                        theme === "light" && s.dark_theme
                    )}>
                        <>
                            <div onClick={handleEditPost}>
                                <GoPencil/> Edit Post
                            </div>
                            <div>
                                <AiFillDelete/> Remove Post
                            </div>
                            <div>
                                <AiOutlineCopy/> copy Post
                            </div>
                        </>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartHeader;