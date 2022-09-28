import React, {FC, useState} from 'react';
import {AiOutlineHeart} from "react-icons/ai";
import {BiMessageRounded} from "react-icons/bi";
import {NavLink} from "react-router-dom";
import s from "./Posts.module.scss"

import {PostsState} from "../../../typing";
import LoadButton from "../../LoadButton";
import {RootState, useAppSelector} from "../../../redux/store";


interface Props {
    profilePosts: any
    status: string
}

const Posts: FC<Props> = ({profilePosts, status}) => {
    const [load, setLoad] = useState(false)
    const {pages} = useAppSelector((state: RootState) => state.posts)

    if (status !== "loading" && profilePosts.result === 0) return <h2 className={s.no_post}>No Post!</h2>


    const handleLoadMore = () => {

    }

    return (
        <section className={s.posts}>
            {profilePosts.posts?.map((post: PostsState) => (
                <NavLink to={`/post/${post._id}`} key={post._id}>
                    <img src={post.images[0]} alt="img"/>
                    <div className={s.info}>
                                <span>
                                    <AiOutlineHeart/>
                                    {post.likes.length}
                                </span>
                        <span>
                                <BiMessageRounded/>
                            {post.comments.length}
                                </span>
                    </div>
                </NavLink>
            ))}
            <LoadButton
                result={profilePosts.result}
                handleLoadMore={handleLoadMore}
                page={pages}
                load={load}
            />
        </section>
    );
};

export default Posts;