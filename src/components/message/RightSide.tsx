import React, {SyntheticEvent, useEffect, useState} from 'react';
import clsx from "clsx";

import s from "./Message.module.scss"

import {RiSendPlane2Fill} from "react-icons/ri"
import {useParams} from "react-router-dom";
import {MdDelete, MdPhoto} from "react-icons/md"
import {RiCloseCircleLine} from "react-icons/ri"

import {RootState, useAppDispatch, useAppSelector} from "../../redux/store";
import {addMessageData, addMessageDataApi} from "../../redux/slices/messageUseresSlices";
import {setNotify} from "../../redux/slices/notifySlices";
import {imageShow, videoShow} from "../../utils/mediaShow";
import {ChatDataState, ChatUsersState} from "../../typing";
import {imageUpload} from "../../utils/ImageUploaded";
import {fetchDataApi} from "../../api/postDataApi";
import {IMAGES} from "../../images";

import MessageDisplay from "./MessageDisplay";
import UserCard from "../userCard";
import Icons from "../Icons";


const RightSide = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()

    const {users, data} = useAppSelector((state: RootState) => state.messageUsers)
    const {user: auth, token} = useAppSelector((state: RootState) => state.auth)

    const [user, setUser] = useState<any>()
    const [text, setText] = useState<string>("")
    const [media, setMedia] = useState<any>([])
    const [loadingMedia, setLoadingMedia] = useState<boolean>(false)

    useEffect(() => {
        const newUser = users.find((user: ChatUsersState) => user._id === id)
        if (newUser) {
            setUser(newUser)
        }
    }, [users, id])


    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        if (!text.trim()) return


        setLoadingMedia(true)


        let _newArr: any = []
        if (media.length > 0) {
            for (let img of media) {
                const {success, error} = await imageUpload(img)
                _newArr.push((success as any).url)
            }
        }


        const msg: ChatDataState = {
            sender: auth._id,
            recipient: id!,
            text,
            media: _newArr,
            createdAt: new Date().toISOString()
        }

        dispatch(addMessageData(msg))
        setLoadingMedia(false)

        await fetchDataApi.postData(`message`, token!, {...msg})

        setText("")
        setMedia([])

        // const {createAt, ...others} = msg

        // const {success, error} = await fetchDataApi.postData(`message`, token!, others)
        //
        // console.log("success - > ", success)
        // console.log("error - > ", error)


    }

    const onHandleMediaChange = (e: { target: { files: any; }; }) => {
        let err = ""
        let newMedia: any = []
        if (!e.target.files) {
            return err = "File does not exist";
        }

        const files = [...e.target.files]


        files.forEach(file => {
            if (file.size > 1024 * 1024 * 5) {
                return err = "The image/video largest is 5mb"
            }
            return newMedia.push(file)
        })

        if (err.length > 0) {
            dispatch(setNotify({error: [{msg: err}]}))
        }
        setMedia([...media, ...newMedia])
    }


    const handleDeleteMedia = (index: number) => {
        let _newMedia = [...media]
        _newMedia.splice(index, 1)
        setMedia(_newMedia)
    }


    useEffect(() => {
        fetchDataApi.getData(`messages/${id}`, token!)
            .then(({success}) => {
                dispatch(addMessageDataApi(success))
            })
            .catch(err => console.log(err))
    }, [id, auth])

    return (
        <div className={s.rightSide}>
            {user && (
                <UserCard {...user! as any} className={clsx(s.rightSide_deleteIcons, s.rightSide_users_styles)}>
                    <span>
                        <MdDelete/>
                    </span>
                </UserCard>
            )}

            <div className={s.rightSide_body_box}>
                <div className={s.chat_display}>
                    {data?.map((msg: any, index: number) => {
                        return (
                            <div key={index}>

                                {
                                    msg.sender !== auth._id && <div className={clsx(s.chat_row, s.chat_other)}>
                                        <MessageDisplay user={user!} msg={msg}/>
                                    </div>
                                }
                                {
                                    msg.sender === auth._id && <div className={clsx(s.chat_row, s.chat_me)}>
                                        <MessageDisplay user={auth!} msg={msg}/>
                                    </div>
                                }
                            </div>
                        )
                    })}
                    {
                        loadingMedia &&
                        <div style={{width: "100%", display: "flex", justifyContent: "center", margin: "10px 0"}}>
                            <img src={IMAGES.spinner} style={{width: "30px", height: "30px"}} alt=""/>
                        </div>
                    }
                </div>
                <div>
                    {media.map((item: any, index: number) => {
                        return (
                            <div className={s.rightSide_body_box_media} key={index}>
                                {

                                    item.type.match(/video/i)
                                        ? videoShow(URL.createObjectURL(item))
                                        : imageShow(typeof item === "object" ? URL.createObjectURL(item) : item)
                                }
                                <span onClick={() => handleDeleteMedia(index)}>
                                    <RiCloseCircleLine/>
                                </span>
                            </div>
                        )
                    })}
                </div>
                <div className={s.rightSide_body_box_form}>
                    <form onSubmit={handleSubmit}>
                        <div className={s.icons}>
                            <Icons setContent={setText} className={s.icons_styles}/>
                        </div>
                        <input
                            type="text"
                            value={text}
                            onChange={e => setText(e.target.value)}
                            placeholder="Enter you message..."
                        />

                        <div>
                            <label htmlFor="file">
                                <MdPhoto/>
                            </label>
                            <input
                                type="file"
                                name="file"
                                id="file"
                                multiple
                                accept="image/*,video/*"
                                hidden
                                onChange={onHandleMediaChange}
                            />
                        </div>

                        <button disabled={!text} type="submit">
                            <RiSendPlane2Fill/>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RightSide;