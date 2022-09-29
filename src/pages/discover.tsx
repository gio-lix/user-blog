import React, {useEffect, useState} from 'react';
import {RootState, useAppDispatch, useAppSelector} from "../redux/store";
import axios from "axios";
import Posts from "../components/profile/posts";
import {IMAGES} from "../images";
import {getDiscoveryPostApi, setDiscoveryPosts} from "../redux/slices/postsSlice";

const Discover = () => {
    const dispatch = useAppDispatch()
    const {token} = useAppSelector((state: RootState) => state.auth)
    const {discoveryPosts, status} = useAppSelector((state:RootState) => state.posts)
    const [loading, setLoading] = useState("loading")



    useEffect(() => {
        (async () => {
            setLoading("loading")
            try {
                const {data} = await axios.get(`/api/post_discover` ,{
                    headers: {
                        'Authorization': `${token}`
                    }
                })
                dispatch(setDiscoveryPosts(data))
            } catch (err) {
                console.log(err)
            } finally {
                setLoading("loaded")
            }
        })()
    },[token])

    const handleLoadMore = async () => {
        dispatch(getDiscoveryPostApi({page: discoveryPosts.page, token}))
    }


    return (
        <section>
            {loading === "loading" ? (
                <div className="loading">
                    <img src={IMAGES.spinner} alt="spinner"/>
                </div>
            ) : (
                <Posts
                    profilePosts={discoveryPosts}
                    status={status}
                    load={status === "loading"}
                    handleLoadMore={handleLoadMore}
                />
            )}
        </section>
    );
};

export default Discover;