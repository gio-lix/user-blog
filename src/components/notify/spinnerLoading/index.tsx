import React from 'react';
import {IMAGES} from "../../../images";
import s from "./SpinnerLoading.module.scss"

const SpinnerLoading = () => {
    return (
        <section className={s.spinner}>
            <img src={IMAGES.spinner} alt="spinner"/>
        </section>
    );
};

export default SpinnerLoading;