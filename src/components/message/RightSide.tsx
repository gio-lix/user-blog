import React, {SyntheticEvent, useEffect, useState} from 'react';
import clsx from "clsx";

import s from "./Message.module.scss"

import {RiSendPlane2Fill} from "react-icons/ri"
import {useParams} from "react-router-dom";
import {MdDelete, MdPhoto} from "react-icons/md"
import {RiCloseCircleLine} from "react-icons/ri"

import {RootState, useAppDispatch, useAppSelector} from "../../redux/store";
import {setNotify} from "../../redux/slices/notifySlices";
import {imageShow, videoShow} from "../../utils/mediaShow";
import {UserState} from "../../typing";
import MessageDisplay from "./MessageDisplay";
import UserCard from "../userCard";
import Icons from "../Icons";



const RightSide = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()

    const {users} = useAppSelector((state: RootState) => state.messageUsers)
    const {user: auth} = useAppSelector((state: RootState) => state.auth)

    const [user, setUser] = useState<UserState>()
    const [text, setText] = useState<string>("")
    const [media, setMedia] = useState<any>([])

    useEffect(() => {
        const newUser = users.find((user: UserState) => user._id === id)
        if (newUser) {
            setUser(newUser)
        }
    }, [users, id])


    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        if (!text.trim()) return

        // setText("")
        // setMedia([])
    }

    const onHandleMediaChange = (e: any) => {
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


    return (
        <div className={s.rightSide}>
            <UserCard {...user!} className={s.rightSide_deleteIcons}>
                <span>
                    <MdDelete/>
                </span>
            </UserCard>

            <div className={s.rightSide_body_box}>
                <div className={s.chat_display}>
                    <div className={clsx(s.chat_row, s.chat_other)}>
                        <MessageDisplay user={user!}/>
                    </div>
                    <div className={clsx(s.chat_row, s.chat_me)}>
                        <MessageDisplay user={auth!}/>
                    </div>

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
                                    <RiCloseCircleLine />
                                </span>
                            </div>
                        )
                    })}
                </div>
                <div className={s.rightSide_body_box_form}>
                    <form onSubmit={handleSubmit}>
                        <div className={s.icons}>
                            <Icons setContent={setText} className={s.icons_styles} />
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