import React, {useEffect} from 'react';
import {PostsState} from "../../../typing";
import { NavLink} from "react-router-dom";
import {RootState, useAppSelector} from "../../../redux/store";
import s from "./Posts.module.scss"
import {AiOutlineHeart} from "react-icons/ai";
import {BiMessageRounded} from "react-icons/bi";


const Posts = () => {
    const {profilePosts, user} = useAppSelector((state: RootState) => state.auth)

    useEffect(() => {
        console.log("profilePosts - ", profilePosts.posts)
    },[profilePosts])

    return (
        <section className={s.posts}>
            {profilePosts.posts.map((post: PostsState) => (
                <NavLink to={`/posts/${post._id}`} key={post._id}>
                    <img src={post.images[0]} alt="img"/>
                    <div className={s.info}>
                        <span>
                            <AiOutlineHeart />
                            {post.likes.length}
                        </span>
                        <span>
                            <BiMessageRounded />
                            {post.comments.length}
                        </span>
                    </div>
                </NavLink>
            ))}
        </section>
    );
};

export default Posts;