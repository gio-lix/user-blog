import React, {useEffect, useState} from 'react';
import {RootState, useAppSelector} from "../redux/store";
import axios from "axios";
import Posts from "../components/profile/posts";
import {IMAGES} from "../images";

const Discover = () => {
    const {token} = useAppSelector((state: RootState) => state.auth)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState("loaded")

    useEffect(() => {
        (async () => {
            setLoading("loading")
            try {
                const {data} = await axios.get(`/api/post_discover`, {
                    headers: {
                        'Authorization': `${token}`
                    }
                })
                setData(data)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading("loaded")
            }
        })()
    },[])



    return (
        <section>
            {loading === "loading" ? (
                <div className="loading">
                    <img src={IMAGES.spinner} alt="spinner"/>
                </div>
            ) : (
                <Posts profilePosts={data} status={loading} />
            )}
        </section>
    );
};

export default Discover;