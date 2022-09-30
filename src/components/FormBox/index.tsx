import React, {FC} from 'react';
import s from "./FormBox.module.scss"
import {RootState, useAppSelector} from "../../redux/store";
import clsx from "clsx";


interface Props {
    title: string,
    children: React.ReactNode
}

const FormBox:FC<Props> = ({children,title}) => {
    const {theme} = useAppSelector((state:RootState) => state.notify)

    return (
        <section className={clsx(s.root,
                theme === "light" && s.formBox_theme
            )}>
            <h1>{title}</h1>
            {children}
        </section>
    );
};

export default FormBox;