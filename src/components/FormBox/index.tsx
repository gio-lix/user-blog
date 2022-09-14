import React, {FC} from 'react';
import s from "./FormBox.module.scss"


interface Props {
    title: string,
    children: React.ReactNode
}

const FormBox:FC<Props> = ({children,title}) => {

    return (
        <section className={s.root}>
            <h1>{title}</h1>
            {children}
        </section>
    );
};

export default FormBox;