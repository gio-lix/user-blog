import React, {useEffect, useState} from 'react';
import {RootState, useAppSelector} from "../../../redux/store";
import {PostsState} from "../../../typing";
import CartHeader from "./post_card/CartHeader";
import CartBody from "./post_card/CartBody";
import CartFooter from "./post_card/CartFooter";
import s from "./Post.module.scss"

const Posts = () => {
    const [postData, setPostData] = useState< [] | PostsState[]>([])
    const {posts} = useAppSelector((state:RootState) => state.posts)


    useEffect(() => {
        let mounted = true
        if (mounted) {
            setPostData(posts)
        }
        return () => {mounted = false}
    } ,[posts])


    return (
        <section >
            {postData?.map((post: PostsState, index) => {
                return (
                    <div className={s.post} key={`${post._id}_${index}`}>
                        <CartHeader post={post} />
                        <CartBody post={post} />
                        <CartFooter post={post} />
                    </div>
                )
            })}
        </section>
    );
};

export default Posts;