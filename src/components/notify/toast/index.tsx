import React, {FC, useEffect} from 'react';
import s from "./Toast.module.scss"
import {ValidState} from "../../../typing";

interface MessageProps {
    title: string,
    body: ValidState
}

interface Props {
    message?: MessageProps
    handleShow?: () => void
    bgColor?: string
}

const Toast: FC<Props> = ({handleShow, message, bgColor}) => {

    return (
            <section className={s.root}>
                <div style={{backgroundColor: bgColor}}>
                    <strong>{message?.title}</strong>
                    <button onClick={handleShow}>&times;</button>
                </div>
                {message?.title.toLowerCase() === "error" ? Object.values(message?.body as ValidState)?.map((item: any,index: number) => {
                    return (
                       <div key={index} style={{backgroundColor: bgColor}}>
                          <p>{item}</p>
                       </div>
                    )
                }) : (
                    <div style={{backgroundColor: bgColor}}>
                        <p>{(message as any)?.body}</p>
                    </div>
                )}
            </section>
    );
};

export default Toast;