import React, {FC} from 'react';
import {AiOutlineHeart} from "react-icons/ai";
import {BiMessageRounded} from "react-icons/bi";
import {NavLink} from "react-router-dom";
import s from "./Posts.module.scss"

import {PostsState} from "../../../typing";
import LoadButton from "../../LoadButton";
import {IMAGES} from "../../../images";
import PostContainer from "../postContainer";


interface Props {
    profilePosts: any
    status: string
    handleLoadMore: Function
    load: boolean
}

const Posts: FC<Props> = ({profilePosts, status, handleLoadMore, load}) => {

    if (status !== "loading" && profilePosts?.result === 0) return <h2 className={s.no_post}>No Post!</h2>


    return (
        <>
            <PostContainer status={status === "loading"} posts={profilePosts.posts!}>
                <div className="d-flex j-c-center a-i-center">
                    {load ? (
                        <img src={IMAGES.spinner} alt="spinner"/>
                    ) : (
                        <LoadButton
                            result={profilePosts.result}
                            handleLoadMore={handleLoadMore}
                            page={profilePosts.page}
                            load={load}
                        />
                    )}
                </div>
            </PostContainer>
            {/*<section className={s.posts}>*/}
            {/*    {profilePosts.posts?.map((post: PostsState, index: number) => (*/}
            {/*        <NavLink to={`/post/${post?._id}`} key={`${post._id}_${index}`}>*/}
            {/*            <img src={post?.images?.[0]} alt="img"/>*/}
            {/*            <div className={s.info}>*/}
            {/*                    <span>*/}
            {/*                        <AiOutlineHeart/>*/}
            {/*                        {post?.likes.length}*/}
            {/*                    </span>*/}
            {/*                <span>*/}
            {/*                    <BiMessageRounded/>*/}
            {/*                    {post?.comments.length}*/}
            {/*                    </span>*/}
            {/*            </div>*/}
            {/*        </NavLink>*/}
            {/*    ))}*/}
            {/*</section>*/}
            {/*<div className={s.loadButton}>*/}
            {/*    {load ? (*/}
            {/*        <img src={IMAGES.spinner} alt="spinner"/>*/}
            {/*    ) : <LoadButton*/}
            {/*        result={profilePosts.result}*/}
            {/*        handleLoadMore={handleLoadMore}*/}
            {/*        page={profilePosts.page}*/}
            {/*        load={load}*/}
            {/*    />}*/}
            {/*</div>*/}
        </>
    );
};

export default Posts;