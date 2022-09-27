import React, {FC} from 'react';
import CartHeader from "./home/posts/post_card/CartHeader";
import CartBody from "./home/posts/post_card/CartBody";
import CartFooter from "./home/posts/post_card/CartFooter";
import {PostsState} from "../typing";
import Comments from "./home/comments/Comments";
import InputComments from "./home/comments/inputComments";


interface Props {
    post: PostsState
}

const PostCart:FC<Props> = ({post}) => {
    return (
        <div className="post_cart">
            <CartHeader post={post} />
            <CartBody post={post} />
            <CartFooter post={post} />

            <Comments post={post}/>
            <InputComments post={post}/>
        </div>
    );
};

export default PostCart;