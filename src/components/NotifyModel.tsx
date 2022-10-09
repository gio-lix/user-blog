import React from 'react';
import moment from "moment";
import clsx from "clsx";

import {NavLink} from "react-router-dom";

import {IoMdNotificationsOff, IoIosNotifications} from "react-icons/io"
import {MdNotificationAdd} from "react-icons/md"
import {GoPrimitiveDot} from "react-icons/go"

import {RootState, useAppSelector} from "../redux/store";
import {NotifyPostsState} from "../typing";


const NotifyModel = () => {

    const {posts, sound} = useAppSelector((state: RootState) => state.postNotify)
    const {theme} = useAppSelector((state: RootState) => state.notify)


    return (
        <>
            <div className={clsx("notify", theme === "light" && "notify_theme")}>
                <h3>Notification</h3>
                {sound ? (
                    <span>
                        <IoIosNotifications/>
                    </span>
                ) : (
                    <span className="notify_off">
                        <IoMdNotificationsOff/>
                    </span>
                )}
            </div>
            <section className="notify_body">
                {posts.length === 0 ? (
                    <span>
                        <MdNotificationAdd/>
                    </span>
                ) : (
                    <div>
                        <div className={clsx("notify_body_items")}>
                            {posts?.map((item: NotifyPostsState, index: number) => {
                                return (
                                    <NavLink className={clsx(
                                        "notify_navLink",
                                        theme === "light" && "notify_navLink_theme"
                                    )} to={`${item?.url}`}
                                             key={`${item?._id}_${index}`}>
                                        <div className="notify_navLink_head">
                                            <article>
                                                <img src={item?.user.avatar} alt="avatar"/>
                                                <strong>{item?.user.username}</strong>
                                            </article>
                                            <article>
                                                <span >{item?.text}</span>
                                                {item?.image && (
                                                    <img src={item?.image} alt="image"/>
                                                )}
                                            </article>
                                        </div>
                                        <div className="notify_navLink_footer">
                                            {item?.content && <small>{item?.content.slice(0, 25)} {"   "} ...</small>}
                                            <small>
                                                {moment(item?.createdAt).fromNow()}
                                                {!item?.isRead && <span> <GoPrimitiveDot/> </span>}
                                            </small>
                                        </div>
                                    </NavLink>
                                )
                            })}
                        </div>
                        <div className={clsx(
                            "notify_body_footer",
                            theme === "light" && "notify_body_footer_button_theme"
                        )}>
                            <p>delete all</p>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default NotifyModel;