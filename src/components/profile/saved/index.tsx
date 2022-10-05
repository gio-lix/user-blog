import React, {FC, useEffect} from 'react';
import axios from "axios";
import {RootState, useAppDispatch, useAppSelector} from "../../../redux/store";
import {getSavedPostApi} from "../../../redux/slices/postSavedSlice";
import PostContainer from "../postContainer";
import {IMAGES} from "../../../images";
import LoadButton from "../../LoadButton";
import {useParams} from "react-router-dom";

interface Props {
    load: any
    page: any
    result: number
    handleLoadMore: any
}

const Saved: FC<Props> = ({result, page, handleLoadMore, load}) => {
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const {token} = useAppSelector((state: RootState) => state.auth)
    const {posts, status} = useAppSelector((state: RootState) => state.savedPosts)


    useEffect(() => {
        dispatch(getSavedPostApi({token}))
    }, [id])


    return (
        <PostContainer status={status === "loading"} posts={posts!}>
            <div  className="d-flex j-c-center a-i-center">
                {load ? (
                    <img src={IMAGES.spinner} alt="spinner"/>
                ) : (
                    <LoadButton
                        result={result}
                        handleLoadMore={handleLoadMore}
                        page={page}
                        load={load}
                    />
                )}
            </div>
        </PostContainer>
    );
};

export default Saved;