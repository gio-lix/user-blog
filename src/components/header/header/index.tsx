import React from 'react';
import s from "./Header.module.scss"
import Menu from "../menu";
import Search from "../search";

const Header = () => {

    return (
        <header className={s.header}>
            <p onClick={() => window.scrollTo({top: 0})} className={s.header_logo}>Logo</p>
            <Search />
            <Menu />
        </header>
    );
};

export default Header;