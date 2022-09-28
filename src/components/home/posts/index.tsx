import React, {useEffect, useState} from 'react';
import {RootState, useAppSelector} from "../../../redux/store";
import {PostsState} from "../../../typing";
import PostCart from "../../PostCart";

const Posts = () => {
    const [postData, setPostData] = useState<[] | PostsState[]>([])
    const {posts, status} = useAppSelector((state: RootState) => state.posts)


    useEffect(() => {
        setPostData(posts)
    }, [posts, status])


    return (
        <section>
            {postData?.map((post: PostsState, index) => (
                <PostCart key={`${post._id}_${index}`} post={post}/>
            ))}
        </section>
    );
};

export default Posts;

