import React, {useEffect, useState} from 'react';
import Status from "../components/home/status";
import Posts from "../components/home/posts";
import {RootState, useAppDispatch, useAppSelector} from "../redux/store";
import {IMAGES} from "../images";
import {getPosts, setLoadPosts} from "../redux/slices/postsSlice";
import axios from "axios";
import LoadButton from "../components/LoadButton";

const Home = () => {
    const {result, status, pages} = useAppSelector((state:RootState) => state.posts)
    const {token} = useAppSelector((state:RootState) => state.auth)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (token) {
            dispatch(getPosts({token}))
        }
    },[token])

    const [loading, setLoading] = useState(false)

    const onHandleClickLoad = async () => {
        setLoading(true)
        try {
            const {data} = await axios.get(`/api/posts?page=${pages}`, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            dispatch(setLoadPosts(data))
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }



    return (
        <main>
            <>
                <Status />
                {(result === 0 && status === "loaded") ? <h1>No Posts</h1> : (

                    <Posts />
                )}
            </>
            <div className="spinner_center">
                {loading ? (
                    <img src={IMAGES.spinner} alt="spinner"/>
                ) : (
                    <LoadButton
                        result={result}
                        handleLoadMore={onHandleClickLoad}
                        page={pages}
                        load={loading}
                    />
                )}
            </div>

        </main>
    );
};

export default Home;