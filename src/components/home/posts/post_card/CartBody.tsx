import React, {FC, useState} from 'react';
import {PostsState} from "../../../../typing";
import s from "./PostCard.module.scss"
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai"
import {BsDashLg} from "react-icons/bs"
import clsx from "clsx";

interface Props {
    post: PostsState
}

const CartBody: FC<Props> = ({post}) => {
    const [imageIndex, setImageIndex] = useState<number>(0)
    const [readMore, setReadMore] = useState<boolean>(false)

    const right = () => {
        if (post.images.length - 1 === imageIndex) return
        setImageIndex(prev => prev + 1)
    }
    const left = () => {
        if (imageIndex === 0) return
        setImageIndex(prev => prev - 1)
    }

    return (
        <div className={s.body}>
            <div className={s.body_content}>
                <span>
                    {post.content.length < 60
                        ? post.content
                        : readMore ? post.content + " " : post.content.slice(0, 60) + "..."
                    }
                </span>
                {post.content.length > 60 &&
                    <span className={s.readMore} onClick={() => setReadMore(!readMore)}>
                        {readMore ? "Hide content" : "Read more"}
                    </span>
                }
            </div>
            <div className={s.body_img}>
                {post.images.length > 1 ? (
                    <div className={s.body_img_box}>
                        <img src={post.images[imageIndex]} alt="img"/>
                        <span onClick={left} className={s.left_button}><AiOutlineLeft/></span>
                        <span onClick={right} className={s.right_button}><AiOutlineRight/></span>
                        <div className={s.dash}>
                            {post.images.map((el, index: number) => (
                                <span
                                    className={clsx(index === imageIndex && s.white)}
                                    onClick={() => setImageIndex(index)}
                                    key={index}
                                >
                                <BsDashLg/>
                        </span>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        <img src={post.images[0]} alt=""/>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartBody;